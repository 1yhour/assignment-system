<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     *
     * Creates default accounts for each role so you can test
     * the authorization system immediately after migrating.
     *
     * Credentials:
     *   admin@labflow.test   / password
     *   teacher@labflow.test / password
     *   student@labflow.test / password
     */
    public function run(): void
    {
        $accounts = [
            [
                'name'     => 'Admin User',
                'email'    => 'admin@labflow.test',
                'role'     => 'admin',
                'password' => 'password',
            ],
            [
                'name'     => 'Teacher User',
                'email'    => 'teacher@labflow.test',
                'role'     => 'teacher',
                'password' => 'password',
            ],
            [
                'name'     => 'Student User',
                'email'    => 'student@labflow.test',
                'role'     => 'student',
                'password' => 'password',
            ]
        ];

        // Only add the extra admin account if ADMIN_EMAIL is set in the .env file
        if (env('ADMIN_EMAIL')) {
            $accounts[] = [
                'name'     => env('ADMIN_NAME', 'Super Admin'),
                'email'    => env('ADMIN_EMAIL'),
                'role'     => 'admin',
                'password' => env('ADMIN_PASSWORD', 'password'),
            ];
        }

        foreach ($accounts as $account) {
            User::updateOrCreate(
                ['email' => $account['email']],
                [
                    'name'     => $account['name'],
                    'password' => Hash::make($account['password']), // <-- Fix is here
                    'role'     => $account['role'],
                ]
            );
        }
    }
}
