<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the dashboard is publicly available', function () {
    $this->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('version', 'v1.18'),
        );
});
