<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/logger.php';
require_once __DIR__ . '/error_handler.php';

class RateLimiter
{
    public static function check(string $ip): void
    {
        try {
            $db = Database::getConnection();
            $windowMs = Config::get('RATE_LIMIT_WINDOW_MS');
            $maxRequests = Config::get('RATE_LIMIT_MAX_REQUESTS');
            $now = (int) (microtime(true) * 1000);
            $windowStart = $now - $windowMs;

            $db->prepare("DELETE FROM rate_limits WHERE window_start < :cutoff")
                ->execute([':cutoff' => $windowStart]);

            $stmt = $db->prepare("SELECT request_count, window_start FROM rate_limits WHERE ip_address = :ip");
            $stmt->execute([':ip' => $ip]);
            $record = $stmt->fetch();

            if (!$record) {
                $db->prepare("INSERT INTO rate_limits (ip_address, request_count, window_start) VALUES (:ip, 1, :now)")
                    ->execute([':ip' => $ip, ':now' => $now]);
                Logger::debug('Rate limit record created', ['ip' => $ip]);
                return;
            }

            if ($record['window_start'] < $windowStart) {
                $db->prepare("UPDATE rate_limits SET request_count = 1, window_start = :now WHERE ip_address = :ip")
                    ->execute([':now' => $now, ':ip' => $ip]);
                Logger::debug('Rate limit window reset', ['ip' => $ip]);
                return;
            }

            if ($record['request_count'] >= $maxRequests) {
                Logger::warn('Rate limit exceeded', [
                    'ip' => $ip,
                    'count' => $record['request_count'],
                    'limit' => $maxRequests,
                ]);
                throw new RateLimitException($ip);
            }

            $db->prepare("UPDATE rate_limits SET request_count = request_count + 1 WHERE ip_address = :ip")
                ->execute([':ip' => $ip]);

            Logger::debug('Rate limit incremented', [
                'ip' => $ip,
                'count' => $record['request_count'] + 1,
            ]);

        } catch (RateLimitException $e) {
            throw $e;
        } catch (Throwable $e) {
            Logger::error('Rate limiter error', [
                'ip' => $ip,
                'error' => $e->getMessage(),
            ]);
            throw new DatabaseException('Rate limiter failed', ['ip' => $ip], $e);
        }
    }
}
