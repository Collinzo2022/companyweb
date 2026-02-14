<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';

class Logger
{
    private const LEVELS = ['DEBUG' => 0, 'INFO' => 1, 'WARN' => 2, 'ERROR' => 3];
    private static ?int $minLevel = null;
    private static ?string $logPath = null;
    private static bool $toConsole = true;
    private static bool $toFile = true;

    private static function initialize(): void
    {
        if (self::$minLevel !== null)
            return;

        $levelName = strtoupper(Config::get('LOG_LEVEL', 'debug'));
        self::$minLevel = self::LEVELS[$levelName] ?? 0;
        self::$toConsole = filter_var(Config::get('LOG_TO_CONSOLE', true), FILTER_VALIDATE_BOOLEAN);
        self::$toFile = filter_var(Config::get('LOG_TO_FILE', true), FILTER_VALIDATE_BOOLEAN);

        $logPath = Config::get('LOG_PATH', dirname(__DIR__) . '/logs/app.log');
        $logDir = dirname($logPath);

        if (self::$toFile && !is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }

        self::$logPath = $logPath;
    }

    public static function log(string $level, string $message, array $meta = []): void
    {
        self::initialize();

        $levelValue = self::LEVELS[strtoupper($level)] ?? 1;
        if ($levelValue < self::$minLevel)
            return;

        $entry = [
            'timestamp' => date('c'),
            'level' => strtoupper($level),
            'message' => $message,
        ];

        if (!empty($meta)) {
            $entry['context'] = $meta;
        }

        $json = json_encode($entry, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

        if (self::$toFile && self::$logPath) {
            file_put_contents(self::$logPath, $json . PHP_EOL, FILE_APPEND | LOCK_EX);
        }

        if (self::$toConsole) {
            if ($level === 'ERROR') {
                error_log($json);
            } else {
                file_put_contents('php://stdout', $json . PHP_EOL);
            }
        }
    }

    public static function debug(string $message, array $meta = []): void
    {
        self::log('DEBUG', $message, $meta);
    }

    public static function info(string $message, array $meta = []): void
    {
        self::log('INFO', $message, $meta);
    }

    public static function warn(string $message, array $meta = []): void
    {
        self::log('WARN', $message, $meta);
    }

    public static function error(string $message, array $meta = []): void
    {
        self::log('ERROR', $message, $meta);
    }
}
