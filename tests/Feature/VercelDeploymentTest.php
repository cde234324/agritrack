<?php

test('vercel serves public assets and routes application requests to laravel', function () {
    $configuration = json_decode(
        file_get_contents(base_path('vercel.json')),
        true,
        flags: JSON_THROW_ON_ERROR,
    );

    expect($configuration)
        ->toHaveKey('buildCommand', 'npm run build')
        ->toHaveKey('outputDirectory', 'public')
        ->and($configuration['functions']['api/index.php']['runtime'])
        ->toBe('vercel-php@0.7.4')
        ->and($configuration['rewrites'])
        ->toContain([
            'source' => '/(.*)',
            'destination' => '/api/index.php',
        ]);
});

test('vercel php function boots the laravel public entry point', function () {
    $entryPoint = file_get_contents(base_path('api/index.php'));

    expect($entryPoint)
        ->toContain("'VIEW_COMPILED_PATH' => '/tmp/views'")
        ->toContain("'SESSION_DRIVER' => 'cookie'")
        ->toContain("require __DIR__.'/../public/index.php';");
});
