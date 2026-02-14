<?php
// Router script for PHP built-in development server
// Usage: php -S localhost:8080 router.php

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Serve static files directly
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Route all requests to index.php
require __DIR__ . '/index.php';
