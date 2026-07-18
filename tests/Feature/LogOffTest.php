<?php

test('log off clears the current session', function () {
    $this->withSession(['temporary_data' => 'should be removed'])
        ->post(route('log-off'))
        ->assertRedirect(route('login'))
        ->assertSessionMissing('temporary_data');
});

test('log off only accepts post requests', function () {
    $this->get(route('log-off'))->assertMethodNotAllowed();
});
