<?php

namespace Database\Seeders;

use App\Models\SupportHeaderSetting;
use App\Models\WhatsAppChatSetting;
use App\Models\Faq;
use App\Models\ChatbotResponse;
use App\Models\ChatbotSetting;
use Illuminate\Database\Seeder;

class CustomerSupportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SupportHeaderSetting::create([
            'badge_icon' => 'InformationCircleIcon',
            'badge_text' => 'Help Center',
            'title' => 'Customer Support & Troubleshooting',
            'subtitle' => 'Troubleshooting',
            'description' => "Need help with your smart gear? Our dedicated support team and AI assistant are available 24/7 to ensure your experience with UpWearLane is seamless.",
            'background_pattern_icon' => 'LifebuoyIcon',
            'is_active' => true,
        ]);

        WhatsAppChatSetting::create([
            'title' => 'WhatsApp Support',
            'description' => 'Connect directly with our support team for immediate assistance.',
            'phone_number' => '+2347065910449',
            'features' => [
                'Average response time: < 5 minutes',
                'Available 24/7 for premium members',
                'Real-time troubleshooting',
            ],
            'button_text' => 'Chat on WhatsApp',
            'is_active' => true,
        ]);

        $faqs = [
            [
                'question' => 'How do I track my order?',
                'answer' => "You can track your order by logging into your account and visiting the 'Orders' section in your dashboard. Once your order ships, you'll also receive an email with a tracking link.",
                'order' => 1,
            ],
            [
                'question' => 'What is your return policy for tech-infused clothing?',
                'answer' => 'We offer a 30-day return policy for all items, including tech-infused clothing. The items must be in original condition with all tags and tech components (if detachable) included. Please follow the care instructions included with the garment to ensure it remains eligible for return.',
                'order' => 2,
            ],
            [
                'question' => 'How do I update the firmware on my wearable devices?',
                'answer' => "Most devices update automatically through our mobile app. Ensure your device is paired with the app and has at least 50% battery. If a manual update is available, you'll see a notification in the 'Device Settings' section of the app.",
                'order' => 3,
            ],
            [
                'question' => 'Are smart fabrics machine washable?',
                'answer' => 'Many of our smart fabrics are machine washable, but some require specific care. Always check the internal tag for care instructions. For garments with integrated sensors, we typically recommend a cold, gentle cycle and air drying to preserve the sensor longevity.',
                'order' => 4,
            ],
            [
                'question' => 'Do you ship internationally?',
                'answer' => 'Yes, we ship to over 25 countries worldwide. Shipping times and costs vary depending on the destination. You can view the estimated shipping cost and time during the checkout process.',
                'order' => 5,
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }

        ChatbotSetting::create([
            'bot_name' => 'AI Support Bot',
            'bot_subtitle' => 'Powered by UpWearLane Intelligence',
            'welcome_message' => "Hello! I'm your UpWearLane assistant. How can I help you today?",
            'default_response' => "I'm processing your request. For more specific help, you can try asking about 'order status', 'returns', or 'sizing'.",
            'header_icon' => 'CpuChipIcon',
            'is_active' => true,
        ]);

        $responses = [
            [
                'keyword' => 'order',
                'response' => 'To check your order status, please provide your order ID (e.g., #UWL-12345). You can also find this in your dashboard.',
                'priority' => 10,
            ],
            [
                'keyword' => 'return',
                'response' => 'We offer a 30-day hassle-free return policy. Would you like to start a return process or view our return policy details?',
                'priority' => 9,
            ],
            [
                'keyword' => 'size',
                'response' => 'Our size guide is available on every product page. Most of our smart clothing runs true to size, but we recommend checking the specific measurements for tech-infused garments.',
                'priority' => 8,
            ],
            [
                'keyword' => 'sizing',
                'response' => 'Our size guide is available on every product page. Most of our smart clothing runs true to size, but we recommend checking the specific measurements for tech-infused garments.',
                'priority' => 8,
            ],
            [
                'keyword' => 'shipping',
                'response' => 'We offer worldwide shipping with various delivery options. Delivery times typically range from 3-7 business days domestically and 7-14 days internationally.',
                'priority' => 7,
            ],
            [
                'keyword' => 'payment',
                'response' => 'We accept all major credit cards, PayPal, and other secure payment methods. All transactions are encrypted and secure.',
                'priority' => 6,
            ],
        ];

        foreach ($responses as $response) {
            ChatbotResponse::create($response);
        }
    }
}
