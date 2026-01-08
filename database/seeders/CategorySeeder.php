<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds. 
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Smart Watches',
                'slug' => 'smart-watches',
                'description' => 'Advanced smartwatches with health tracking and connectivity',
                'icon' => 'ClockIcon',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Audio Gear',
                'slug' => 'audio-gear',
                'description' => 'Premium audio devices and accessories',
                'icon' => 'MusicalNoteIcon',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Tech Apparel',
                'slug' => 'tech-apparel',
                'description' => 'Smart clothing with integrated technology',
                'icon' => 'TagIcon',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Smart Glasses',
                'slug' => 'smart-glasses',
                'description' => 'AR and smart eyewear technology',
                'icon' => 'EyeIcon',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Fitness Tech',
                'slug' => 'fitness-tech',
                'description' => 'Fitness trackers and health monitoring devices',
                'icon' => 'HeartIcon',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Tech accessories and add-ons',
                'icon' => 'SparklesIcon',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }

        $this->command->info('Categories seeded successfully!');
    }
}
