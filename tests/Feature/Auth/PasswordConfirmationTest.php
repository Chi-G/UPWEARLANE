<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('confirm password screen can be rendered', function () {
    /** @var \Tests\TestCase $this */
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get(route('password.confirm'));

    $response->assertStatus(200);

    $response->assertInertia(fn (Assert $page) => $page
        ->component('user-authentication/confirm-password')
    );
});

test('password confirmation requires authentication', function () {
    /** @var \Tests\TestCase $this */
    $response = $this->get(route('password.confirm'));

    $response->assertRedirect(route('login'));
});