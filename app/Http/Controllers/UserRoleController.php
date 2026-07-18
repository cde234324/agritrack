<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRoleRequest;
use App\Models\UserRole;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserRoleController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('user-roles/index', [
            'roles' => UserRole::query()->withCount('users')->orderBy('role')->get(['id', 'role']),
        ]);
    }

    public function store(StoreUserRoleRequest $request): RedirectResponse
    {
        UserRole::query()->create($request->validated());

        return to_route('user-roles.index')->with('success', 'User role created successfully.');
    }
}
