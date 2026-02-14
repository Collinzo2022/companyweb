<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/logger.php';

class AppException extends Exception
{
    protected array $context = [];

    public function __construct(string $message, int $code = 0, array $context = [], ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->context = $context;
    }

    public function getContext(): array
    {
        return $this->context;
    }
}

class ValidationException extends AppException
{
    public function __construct(string $message, array $errors = [], ?Throwable $previous = null)
    {
        parent::__construct($message, 400, ['errors' => $errors], $previous);
    }

    public function getErrors(): array
    {
        return $this->context['errors'] ?? [];
    }
}

class RateLimitException extends AppException
{
    public function __construct(string $ip, ?Throwable $previous = null)
    {
        parent::__construct('Rate limit exceeded', 429, ['ip' => $ip], $previous);
    }
}

class DatabaseException extends AppException
{
    public function __construct(string $message, array $context = [], ?Throwable $previous = null)
    {
        parent::__construct($message, 500, $context, $previous);
    }
}

class ErrorHandler
{
    private static ?string $requestId = null;

    public static function setRequestId(string $requestId): void
    {
        self::$requestId = $requestId;
    }

    public static function register(): void
    {
        set_error_handler([self::class, 'handleError']);
        set_exception_handler([self::class, 'handleException']);
        register_shutdown_function([self::class, 'handleShutdown']);
    }

    public static function handleError(int $errno, string $errstr, string $errfile, int $errline): bool
    {
        if (!(error_reporting() & $errno)) {
            return false;
        }

        $level = match ($errno) {
            E_WARNING, E_USER_WARNING => 'WARN',
            E_NOTICE, E_USER_NOTICE => 'INFO',
            E_DEPRECATED, E_USER_DEPRECATED => 'INFO',
            default => 'ERROR',
        };

        Logger::log($level, $errstr, [
            'requestId' => self::$requestId,
            'file' => basename($errfile),
            'line' => $errline,
            'type' => 'php_error',
        ]);

        if ($errno === E_ERROR || $errno === E_USER_ERROR) {
            throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
        }

        return true;
    }

    public static function handleException(Throwable $e): void
    {
        $context = [
            'requestId' => self::$requestId,
            'exception' => get_class($e),
            'file' => basename($e->getFile()),
            'line' => $e->getLine(),
        ];

        if ($e instanceof AppException) {
            $context = array_merge($context, $e->getContext());
        }

        if (Config::get('ENV') !== 'production') {
            $context['trace'] = array_slice($e->getTrace(), 0, 5);
        }

        Logger::error($e->getMessage(), $context);

        $statusCode = ($e instanceof AppException) ? $e->getCode() : 500;
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');

        $response = ['success' => false, 'error' => 'Server error'];

        if ($e instanceof ValidationException) {
            $response['error'] = 'Validation failed';
            $response['details'] = $e->getErrors();
        } elseif ($e instanceof RateLimitException) {
            $response['error'] = 'Too many requests';
        } elseif ($e instanceof AppException) {
            $response['error'] = $e->getMessage();
        }

        echo json_encode($response, JSON_UNESCAPED_SLASHES);
        exit;
    }

    public static function handleShutdown(): void
    {
        $error = error_get_last();
        if ($error !== null && in_array($error['type'], [E_ERROR, E_CORE_ERROR, E_COMPILE_ERROR, E_PARSE], true)) {
            Logger::error('Fatal error', [
                'requestId' => self::$requestId,
                'message' => $error['message'],
                'file' => basename($error['file']),
                'line' => $error['line'],
                'type' => 'fatal',
            ]);

            if (!headers_sent()) {
                http_response_code(500);
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'error' => 'Server error'], JSON_UNESCAPED_SLASHES);
            }
        }
    }
}
