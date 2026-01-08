<?php

/**
 * Hostinger Shared Hosting Helper
 * 
 * This file serves as a proxy to the public/index.php file.
 * It ensures the site loads even if the .htaccess rewrite fails for the root path.
 */

// Delegate to the public index
require __DIR__ . '/public/index.php';
