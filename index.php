<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Hostinger / Shared Hosting Root Fix
// Mirrors the logic of public/index.php but adapted for the project root.

// Check for maintenance mode
if (file_exists($maintenance = __DIR__.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register autoloader
require __DIR__.'/vendor/autoload.php';

// Bootstrap the application
$app = require_once __DIR__.'/bootstrap/app.php';

// Handle the request
$app->handleRequest(Request::capture());
