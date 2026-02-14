<?php
declare(strict_types=1);

class Validator
{
    public static function isValidEmail(string $email): bool
    {
        return (bool) preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email);
    }

    public static function sanitizeString(string $str, int $maxLength = 1000): string
    {
        $trimmed = trim($str);
        if (function_exists('mb_substr')) {
            return mb_substr($trimmed, 0, $maxLength);
        }
        return substr($trimmed, 0, $maxLength);
    }

    public static function strLen(string $str): int
    {
        if (function_exists('mb_strlen')) {
            return mb_strlen($str);
        }
        return strlen($str);
    }

    public static function validateContactInput(array $body): array
    {
        $errors = [];

        $name = $body['name'] ?? '';
        $email = $body['email'] ?? '';
        $message = $body['message'] ?? '';

        if (!is_string($name) || self::strLen(trim($name)) < 2) {
            $errors[] = 'Name must be at least 2 characters';
        }

        if (!is_string($email) || !self::isValidEmail($email)) {
            $errors[] = 'Valid email is required';
        }

        if (!is_string($message) || self::strLen(trim($message)) < 10) {
            $errors[] = 'Message must be at least 10 characters';
        }

        return [
            'isValid' => count($errors) === 0,
            'errors' => $errors,
            'sanitized' => [
                'name' => self::sanitizeString((string) $name, 100),
                'email' => self::sanitizeString((string) $email, 254),
                'message' => self::sanitizeString((string) $message, 5000),
            ],
        ];
    }
}
