<?php

use Inertia\Testing\AssertableInertia as Assert;

test('system settings is publicly available', function () {
    $this->get(route('system-settings.edit'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('system-settings')
            ->where('version', 'v1.22'),
        );
});
