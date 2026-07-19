<?php

declare(strict_types=1);

$serverlessDefaults = [
    'APP_CONFIG_CACHE' => '/tmp/config.php',
    'APP_EVENTS_CACHE' => '/tmp/events.php',
    'APP_PACKAGES_CACHE' => '/tmp/packages.php',
    'APP_ROUTES_CACHE' => '/tmp/routes.php',
    'APP_SERVICES_CACHE' => '/tmp/services.php',
    'CACHE_STORE' => 'array',
    'LOG_CHANNEL' => 'stderr',
    'SESSION_DRIVER' => 'cookie',
    'VIEW_COMPILED_PATH' => '/tmp/views',
];

foreach ($serverlessDefaults as $name => $value) {
    if (getenv($name) !== false) {
        continue;
    }

    putenv("{$name}={$value}");
    $_ENV[$name] = $value;
    $_SERVER[$name] = $value;
}

if (! is_dir('/tmp/views')) {
    mkdir('/tmp/views', 0755, true);
}

require __DIR__.'/../public/index.php';
