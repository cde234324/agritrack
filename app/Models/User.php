<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
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
    ];

    protected $hidden = [
        'password',
    ];

    protected $attributes = [
        'account_status' => 'Active',
    ];

    /** @return BelongsTo<UserRole, $this> */
    public function userRole(): BelongsTo
    {
        return $this->belongsTo(UserRole::class);
    }

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'password' => 'hashed',
        ];
    }
}
