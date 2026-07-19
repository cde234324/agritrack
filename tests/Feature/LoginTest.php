<?php

use Inertia\Testing\AssertableInertia as Assert;

test('the login page is publicly available', function () {
    $this->get(route('login'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('login')
            ->where('version', 'v1.22'),
        );
});
