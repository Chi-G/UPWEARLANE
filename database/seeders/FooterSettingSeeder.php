<?php

namespace Database\Seeders;

use App\Models\FooterSetting;
use Illuminate\Database\Seeder;

class FooterSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */ 
    public function run(): void
    {
        FooterSetting::updateOrCreate(
            ['id' => 1],
            [
                'company_description' => 'UpWearLane is the premier destination for cutting-edge wearable technology and smart fashion. We blend innovation with style to create the future of fashion.',
                'social_links' => [
                    ['name' => 'Facebook', 'url' => 'https://facebook.com/upwearlane', 'icon' => 'Facebook'],
                    ['name' => 'Twitter', 'url' => 'https://twitter.com/upwearlane', 'icon' => 'Twitter'],
                    ['name' => 'Instagram', 'url' => 'https://instagram.com/upwearlane', 'icon' => 'Instagram'],
                    ['name' => 'LinkedIn', 'url' => 'https://linkedin.com/company/upwearlane', 'icon' => 'Linkedin'],
                ],
                'quick_links' => [
                    ['name' => 'About Us', 'url' => '/about'],
                    ['name' => 'Product Catalog', 'url' => '/product-catalog'],
                    ['name' => 'Size Guide', 'url' => '/size-guide'],
                    ['name' => 'Shipping Info', 'url' => '/shipping'],
                    ['name' => 'Returns', 'url' => '/returns'],
                    ['name' => 'Support', 'url' => '/support'],
                ],
                'categories' => [
                    ['name' => 'Smart Watches', 'url' => '/product-catalog?category=smartwatches'],
                    ['name' => 'Fitness Trackers', 'url' => '/product-catalog?category=fitness'],
                    ['name' => 'Smart Clothing', 'url' => '/product-catalog?category=clothing'],
                    ['name' => 'Tech Accessories', 'url' => '/product-catalog?category=accessories'],
                    ['name' => 'AR/VR Gear', 'url' => '/product-catalog?category=arvr'],
                    ['name' => 'New Arrivals', 'url' => '/product-catalog?filter=new'],
                ],
                'contact_address' => 'Abuja, Nigeria',
                'contact_phone' => '+234 7065910449',
                'contact_email' => 'info@upwearlane.com',
                'trust_badges' => ['SSL Secure', 'PCI Compliant', '30-Day Returns', 'Global Shipping'],
                'legal_links' => [
                    ['name' => 'Privacy Policy', 'url' => '/privacy'],
                    ['name' => 'Terms of Service', 'url' => '/terms'],
                    ['name' => 'Cookie Policy', 'url' => '/cookies'],
                ],
                'is_active' => true,
            ]
        );

        $this->command->info('Footer settings seeded successfully!');
    }
}
