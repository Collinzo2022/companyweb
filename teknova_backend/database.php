<?php
declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/logger.php';
require_once __DIR__ . '/error_handler.php';

class Database
{
    private static ?PDO $db = null;

    public static function initialize(): PDO
    {
        if (self::$db !== null)
            return self::$db;

        try {
            $dbPath = Config::get('DB_PATH');
            $dataDir = dirname($dbPath);

            if (!is_dir($dataDir)) {
                mkdir($dataDir, 0755, true);
            }

            self::$db = new PDO("sqlite:$dbPath", null, null, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);

            self::$db->exec("
                CREATE TABLE IF NOT EXISTS contacts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    ip_address TEXT,
                    user_agent TEXT,
                    created_at TEXT DEFAULT (datetime('now'))
                )
            ");

            self::$db->exec("CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)");
            self::$db->exec("CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)");

            self::$db->exec("
                CREATE TABLE IF NOT EXISTS rate_limits (
                    ip_address TEXT PRIMARY KEY,
                    request_count INTEGER DEFAULT 1,
                    window_start INTEGER NOT NULL
                )
            ");

            Logger::info('Database initialized', ['path' => $dbPath]);
            return self::$db;

        } catch (PDOException $e) {
            Logger::error('Database initialization failed', [
                'error' => $e->getMessage(),
                'code' => $e->getCode(),
            ]);
            throw new DatabaseException('Failed to initialize database', ['operation' => 'init'], $e);
        }
    }

    public static function getConnection(): PDO
    {
        return self::$db ?? self::initialize();
    }

    public static function saveContact(array $data): ?int
    {
        try {
            $db = self::getConnection();

            $duplicateCheck = $db->prepare("
                SELECT id FROM contacts 
                WHERE email = :email 
                AND message = :message 
                AND created_at > datetime('now', '-24 hours')
            ");
            $duplicateCheck->execute([
                ':email' => $data['email'],
                ':message' => $data['message'],
            ]);

            if ($duplicateCheck->fetch()) {
                Logger::warn('Duplicate submission blocked', ['email' => $data['email']]);
                return null;
            }

            $stmt = $db->prepare("
                INSERT INTO contacts (name, email, message, ip_address, user_agent, created_at)
                VALUES (:name, :email, :message, :ip_address, :user_agent, datetime('now'))
            ");

            $stmt->execute([
                ':name' => $data['name'],
                ':email' => $data['email'],
                ':message' => $data['message'],
                ':ip_address' => $data['ipAddress'],
                ':user_agent' => $data['userAgent'],
            ]);

            $id = (int) $db->lastInsertId() ?: null;
            Logger::debug('Contact saved to database', ['id' => $id]);
            return $id;

        } catch (PDOException $e) {
            Logger::error('Failed to save contact', [
                'error' => $e->getMessage(),
                'email' => $data['email'] ?? 'unknown',
            ]);
            throw new DatabaseException('Failed to save contact', ['operation' => 'insert'], $e);
        }
    }

    public static function query(string $sql, array $params = []): array
    {
        try {
            $db = self::getConnection();
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            return $stmt->fetchAll();

        } catch (PDOException $e) {
            Logger::error('Database query failed', [
                'error' => $e->getMessage(),
                'query' => substr($sql, 0, 50),
            ]);
            throw new DatabaseException('Database query failed', ['operation' => 'query'], $e);
        }
    }

    public static function execute(string $sql, array $params = []): int
    {
        try {
            $db = self::getConnection();
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            return $stmt->rowCount();

        } catch (PDOException $e) {
            Logger::error('Database execute failed', [
                'error' => $e->getMessage(),
                'query' => substr($sql, 0, 50),
            ]);
            throw new DatabaseException('Database execute failed', ['operation' => 'execute'], $e);
        }
    }
}
