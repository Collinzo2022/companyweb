<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/logger.php';
require_once __DIR__ . '/error_handler.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/rate_limiter.php';
require_once __DIR__ . '/validator.php';

Config::load();

$requestId = bin2hex(random_bytes(16));
ErrorHandler::setRequestId($requestId);
ErrorHandler::register();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');
header("X-Request-ID: $requestId");

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = Config::get('ALLOWED_ORIGINS');

if ($origin && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function jsonResponse(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function getClientIp(): string
{
    return $_SERVER['HTTP_X_FORWARDED_FOR']
        ?? $_SERVER['HTTP_X_REAL_IP']
        ?? $_SERVER['REMOTE_ADDR']
        ?? 'unknown';
}

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');
$startTime = microtime(true);

register_shutdown_function(function () use ($requestId, $method, $uri, $startTime) {
    $duration = round((microtime(true) - $startTime) * 1000);
    $status = http_response_code();

    $level = match (true) {
        $status >= 500 => 'ERROR',
        $status >= 400 => 'WARN',
        default => 'INFO',
    };

    Logger::log($level, 'Request completed', [
        'requestId' => $requestId,
        'method' => $method,
        'path' => $uri,
        'status' => $status,
        'duration' => "{$duration}ms",
    ]);
});

Logger::debug('Request started', [
    'requestId' => $requestId,
    'method' => $method,
    'path' => $uri,
    'ip' => getClientIp(),
]);

Database::initialize();

if ($uri === '/health' && $method === 'GET') {
    jsonResponse(200, [
        'status' => 'healthy',
        'uptime' => time() - (int) ($_SERVER['REQUEST_TIME'] ?? time()),
    ]);
}

if ($uri === '/api/contact' && $method === 'POST') {
    $ip = getClientIp();

    RateLimiter::check($ip);

    $input = file_get_contents('php://input');
    if (strlen($input) > 10240) {
        Logger::warn('Payload too large', ['ip' => $ip, 'size' => strlen($input)]);
        jsonResponse(413, ['success' => false, 'error' => 'Payload too large']);
    }

    $body = json_decode($input, true);
    if ($body === null) {
        Logger::warn('Invalid JSON received', ['ip' => $ip]);
        jsonResponse(400, ['success' => false, 'error' => 'Invalid JSON']);
    }

    $validation = Validator::validateContactInput($body);
    if (!$validation['isValid']) {
        Logger::warn('Validation failed', [
            'ip' => $ip,
            'errors' => $validation['errors'],
        ]);
        jsonResponse(400, [
            'success' => false,
            'error' => 'Validation failed',
            'details' => $validation['errors'],
        ]);
    }

    $contactId = Database::saveContact([
        'name' => $validation['sanitized']['name'],
        'email' => $validation['sanitized']['email'],
        'message' => $validation['sanitized']['message'],
        'ipAddress' => $ip,
        'userAgent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
    ]);

    if ($contactId === null) {
        jsonResponse(409, ['success' => false, 'error' => 'Duplicate submission detected']);
    }

    Logger::info('Contact saved', [
        'contactId' => $contactId,
        'email' => $validation['sanitized']['email'],
    ]);

    jsonResponse(200, ['success' => true, 'message' => 'Message received']);
}

Logger::debug('Route not found', ['path' => $uri, 'method' => $method]);
jsonResponse(404, ['success' => false, 'error' => 'Not found']);
