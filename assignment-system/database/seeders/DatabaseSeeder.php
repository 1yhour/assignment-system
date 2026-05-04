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
                'name'  => 'Admin User',
                'email' => 'admin@labflow.test',
                'role'  => 'admin',
            ],
            [
                'name'  => 'Teacher User',
                'email' => 'teacher@labflow.test',
                'role'  => 'teacher',
            ],
            [
                'name'  => 'Student User',
                'email' => 'student@labflow.test',
                'role'  => 'student',
            ],
        ];

        foreach ($accounts as $account) {
            User::updateOrCreate(
                ['email' => $account['email']],
                [
                    'name'     => $account['name'],
                    'password' => Hash::make('password'),
                    'role'     => $account['role'],
                ]
            );
        }
    }
}
