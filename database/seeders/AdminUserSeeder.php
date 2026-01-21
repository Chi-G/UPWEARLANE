<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admins = [
            [
                'name' => 'Chijindu Nwokeohuru',
                'email' => 'chijindu.nwokeohuru@gmail.com', 
                'password' => env('ADMIN_PASSWORD', 'password'),
            ],
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@upwearlane.com',
                'password' => env('ADMIN_PASSWORD', 'password'),
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@upwearlane.com',
                'password' => env('ADMIN_PASSWORD', 'password'),
            ],
        ];

        foreach ($admins as $admin) { 
            User::updateOrCreate(
                ['email' => $admin['email']],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make($admin['password']),
                    'email_verified_at' => now(),
                ]
            );
        }

        $this->command->info('Admin users created successfully.');
    }
}
