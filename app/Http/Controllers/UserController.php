<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('users/index', [
            'users' => User::query()
                ->select(['id', 'first_name', 'middle_name', 'last_name', 'email', 'account_status', 'user_role_id', 'office_organization'])
                ->with('userRole:id,role')
                ->latest()
                ->get(),
            'roles' => UserRole::query()->withCount('users')->orderBy('role')->get(['id', 'role']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('users/create', [
            'roles' => UserRole::query()->orderBy('role')->get(['id', 'role']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        User::query()->create($request->validated());

        return to_route('users.index')->with('success', 'User account created successfully.');
    }
}
