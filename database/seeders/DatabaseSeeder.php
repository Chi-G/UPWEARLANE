<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void 
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Seed all data in order
        $this->call([
            CategorySeeder::class,
            HeroSettingSeeder::class,
            FooterSettingSeeder::class,
            ProductSeeder::class,
        ]);

        $this->command->info('All seeders completed successfully!');
    }
}
