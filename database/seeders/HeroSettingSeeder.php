<?php

namespace Database\Seeders;

use App\Models\HeroSetting;
use Illuminate\Database\Seeder;

class HeroSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */ 
    public function run(): void 
    {
        HeroSetting::updateOrCreate( 
            ['id' => 1],
            [
                'title' => 'The Future of Fashion is Here',
                'subtitle' => 'Discover cutting-edge wearable technology and smart fabrics that seamlessly blend style with innovation',
                'badge' => '',
                'background_image' => '/images/products/hero/hero-bg.png',
                'hero_image' => '/images/products/hero/hero-image.png',
                'stats' => [
                    ['value' => '50K+', 'label' => 'Happy Customers'],
                    ['value' => '200+', 'label' => 'Tech Products'],
                    ['value' => '25+', 'label' => 'Countries'],
                ],
                'is_active' => true,
            ]
        );

        $this->command->info('Hero settings seeded successfully!');
    }
}
