<?php

namespace Database\Seeders;

use App\Models\UserRole;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (['Admin', 'Farmer', 'Supplier', 'Buyer'] as $role) {
            UserRole::query()->updateOrCreate(['role' => $role]);
        }
    }
}
