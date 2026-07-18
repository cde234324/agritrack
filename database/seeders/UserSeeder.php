<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = UserRole::query()->where('role', 'Admin')->firstOrFail();

        User::query()->updateOrCreate(
            ['email' => config('agritrack.admin.email')],
            [
                'first_name' => 'System',
                'middle_name' => null,
                'last_name' => 'Administrator',
                'suffix' => null,
                'gender' => 'Male',
                'date_of_birth' => '1990-01-01',
                'contact_number' => '0900 000 0000',
                'username' => config('agritrack.admin.email'),
                'user_role_id' => $adminRole->id,
                'office_organization' => 'Municipal Agriculture Office',
                'province' => 'Bulacan',
                'municipality' => 'San Miguel',
                'barangay' => 'Poblacion',
                'password' => config('agritrack.admin.password'),
                'account_status' => 'Active',
            ],
        );
    }
}
