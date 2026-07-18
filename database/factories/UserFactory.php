<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'middle_name' => fake()->optional()->firstName(),
            'last_name' => fake()->lastName(),
            'suffix' => fake()->optional()->randomElement(['Jr.', 'Sr.', 'III']),
            'gender' => fake()->randomElement(['Male', 'Female']),
            'date_of_birth' => fake()->dateTimeBetween('-70 years', '-18 years'),
            'contact_number' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'username' => fake()->unique()->userName(),
            'user_role_id' => UserRole::factory(),
            'office_organization' => fake()->company(),
            'province' => 'Bulacan',
            'municipality' => 'San Miguel',
            'barangay' => 'Poblacion',
            'password' => 'password',
            'account_status' => 'Active',
        ];
    }
}
