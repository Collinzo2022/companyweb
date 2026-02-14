<?php
declare(strict_types=1);

class Config {
    private static ?array $config = null;

    public static function load(): void {
        if (self::$config !== null) return;

        $envPath = dirname(__DIR__) . '/.env';
        if (file_exists($envPath)) {
            $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                $line = trim($line);
                if ($line === '' || str_starts_with($line, '#')) continue;
                if (str_contains($line, '=')) {
                    [$key, $value] = explode('=', $line, 2);
                    $_ENV[trim($key)] = trim($value);
                }
            }
        }

        self::$config = [
            'PORT' => (int) ($_ENV['PORT'] ?? 8080),
            'ENV' => $_ENV['NODE_ENV'] ?? 'development',
            'ALLOWED_ORIGINS' => array_filter(array_map('trim', explode(',', $_ENV['ALLOWED_ORIGINS'] ?? ''))),
            'RATE_LIMIT_WINDOW_MS' => (int) ($_ENV['RATE_LIMIT_WINDOW_MS'] ?? 900000),
            'RATE_LIMIT_MAX_REQUESTS' => (int) ($_ENV['RATE_LIMIT_MAX_REQUESTS'] ?? 10),
            'DB_PATH' => $_ENV['DB_PATH'] ?? dirname(__DIR__) . '/data/contacts.db',
        ];
    }

    public static function get(string $key, mixed $default = null): mixed {
        self::load();
        return self::$config[$key] ?? $default;
    }

    public static function all(): array {
        self::load();
        return self::$config;
    }
}
