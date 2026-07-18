<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LogOffController;
use App\Http\Controllers\PsgcController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/login')->name('home');
Route::inertia('login', 'login')->name('login');
Route::get('dashboard', DashboardController::class)->name('dashboard');
Route::post('log-off', LogOffController::class)->name('log-off');
Route::inertia('system-settings', 'system-settings')->name('system-settings.edit');
Route::resource('users', UserController::class)->only(['index', 'create', 'store']);
Route::resource('user-roles', UserRoleController::class)->only(['index', 'store']);

Route::prefix('api/psgc')->name('psgc.')->controller(PsgcController::class)->group(function (): void {
    Route::get('regions', 'regions')->name('regions');
    Route::get('regions/{regionCode}/provinces', 'provinces')
        ->where('regionCode', '[0-9]{9}')
        ->name('provinces');
    Route::get('provinces/{provinceCode}/cities-municipalities', 'citiesMunicipalities')
        ->where('provinceCode', '[0-9]{9}')
        ->name('cities-municipalities');
    Route::get('cities-municipalities/{cityMunicipalityCode}/barangays', 'barangays')
        ->where('cityMunicipalityCode', '[0-9]{9}')
        ->name('barangays');
});

require __DIR__.'/settings.php';
