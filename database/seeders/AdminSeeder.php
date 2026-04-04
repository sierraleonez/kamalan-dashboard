<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
        Admin::create([
            'name' => 'Super Admin',
            'email' => 'kamalan.registry@gmail.com',
            'password' => Hash::make('Kamalan2022!'),
            'email_verified_at' => now(),
        ]);
    }
}