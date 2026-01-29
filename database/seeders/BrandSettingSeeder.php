<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'brand_name' => 'UpWear',
                'social_media' => [
                    ['platform' => 'instagram', 'url' => 'https://instagram.com/upwear'],
                    ['platform' => 'facebook', 'url' => 'https://facebook.com/upwear'],
                ],
                'is_active' => true,
            ],
            [
                'brand_name' => 'VisionGear',
                'social_media' => [
                    ['platform' => 'twitter', 'url' => 'https://twitter.com/visiongear'],
                ],
                'is_active' => true,
            ],
            [
                'brand_name' => 'SmartPulse',
                'social_media' => [],
                'is_active' => true,
            ],
            [
                'brand_name' => 'NexusCloth',
                'social_media' => [],
                'is_active' => true,
            ],
        ];

        foreach ($brands as $brand) {
            \App\Models\BrandSetting::updateOrCreate(
                ['brand_name' => $brand['brand_name']],
                $brand
            );
        }
    }
}
