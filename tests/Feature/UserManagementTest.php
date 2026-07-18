<?php

use App\Models\User;
use App\Models\UserRole;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;

test('user management displays users and roles', function () {
    $role = UserRole::factory()->create(['role' => 'Admin']);
    User::factory()->for($role)->create([
        'first_name' => 'System',
        'last_name' => 'Administrator',
    ]);

    $this->get(route('users.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/index')
            ->has('users', 1)
            ->where('users.0.first_name', 'System')
            ->where('users.0.user_role.role', 'Admin')
            ->has('roles', 1),
        );
});

test('user registration displays seeded roles', function () {
    $this->seed(DatabaseSeeder::class);

    $this->get(route('users.create'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/create')
            ->has('roles', 4),
        );
});

test('role management displays roles separately from user management', function () {
    UserRole::factory()->create(['role' => 'Supplier']);

    $this->get(route('user-roles.index'))
        ->assertSuccessful()
        ->assertInertia(fn (Assert $page) => $page
            ->component('user-roles/index')
            ->has('roles', 1)
            ->where('roles.0.role', 'Supplier'),
        );
});

test('a user role can be created', function () {
    $this->post(route('user-roles.store'), ['role' => 'Field Officer'])
        ->assertRedirect(route('user-roles.index'));

    expect(UserRole::query()->where('role', 'Field Officer')->exists())->toBeTrue();
});

test('a user account can be created with a hashed password', function () {
    $role = UserRole::factory()->create(['role' => 'Farmer']);

    $this->post(route('users.store'), [
        'first_name' => 'Juan',
        'middle_name' => 'Santos',
        'last_name' => 'Dela Cruz',
        'suffix' => null,
        'gender' => 'Male',
        'date_of_birth' => '1992-06-15',
        'contact_number' => '0917 123 4567',
        'email' => 'JUAN@EXAMPLE.COM',
        'username' => 'JUAN@EXAMPLE.COM',
        'user_role_id' => $role->id,
        'office_organization' => 'San Miguel Farmers Cooperative',
        'province' => 'Bulacan',
        'municipality' => 'San Miguel',
        'barangay' => 'Poblacion',
        'password' => 'SecurePassword123!',
        'password_confirmation' => 'SecurePassword123!',
        'account_status' => 'Active',
    ])->assertRedirect(route('users.index'));

    $user = User::query()->where('email', 'juan@example.com')->firstOrFail();

    expect($user->username)->toBe('juan@example.com')
        ->and(Hash::check('SecurePassword123!', $user->password))->toBeTrue()
        ->and($user->user_role_id)->toBe($role->id);
});

test('required user fields are validated', function () {
    $this->post(route('users.store'), [])
        ->assertSessionHasErrors([
            'first_name',
            'last_name',
            'gender',
            'date_of_birth',
            'contact_number',
            'email',
            'username',
            'user_role_id',
            'office_organization',
            'province',
            'municipality',
            'barangay',
            'password',
            'account_status',
        ]);
});

test('the database seeder creates roles and an admin account', function () {
    $this->seed(DatabaseSeeder::class);

    expect(UserRole::query()->pluck('role')->all())
        ->toContain('Admin', 'Farmer', 'Supplier', 'Buyer');

    $admin = User::query()->where('email', 'admin@agritrack.local')->firstOrFail();

    expect($admin->userRole->role)->toBe('Admin')
        ->and($admin->account_status)->toBe('Active')
        ->and(Hash::check('AgriTrack@2026!', $admin->password))->toBeTrue();
});
