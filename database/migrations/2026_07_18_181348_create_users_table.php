<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table): void {
            $table->id();
            $table->string('first_name', 100);
            $table->string('middle_name', 100)->nullable();
            $table->string('last_name', 100);
            $table->string('suffix', 20)->nullable();
            $table->string('gender', 10);
            $table->date('date_of_birth');
            $table->string('contact_number', 30);
            $table->string('email')->unique();
            $table->string('username')->unique();
            $table->foreignId('user_role_id')->constrained()->restrictOnDelete();
            $table->string('office_organization');
            $table->string('province', 100);
            $table->string('municipality', 100);
            $table->string('barangay', 100);
            $table->string('password');
            $table->string('account_status', 20)->default('Active')->index();
            $table->timestamps();
            $table->index(['last_name', 'first_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
