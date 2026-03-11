<?php

namespace App\Http\Controllers;

use App\Models\ChatbotResponse;
use App\Models\ChatbotSetting;
use App\Models\Faq;
use App\Models\SupportHeaderSetting;
use App\Models\WhatsAppChatSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenApi\Attributes as OA;

class CustomerSupportController extends Controller
{
    #[OA\Get(
        path: "/api/support",
        summary: "Display customer support data",
        tags: ["Support"],
        responses: [
            new OA\Response(response: 200, description: "Support settings, FAQs, and chatbot data")
        ]
    )]
    public function index()
    {
        $supportHeader = SupportHeaderSetting::where('is_active', true)->first();

        $whatsappChat = WhatsAppChatSetting::where('type', 'whatsapp')->where('is_active', true)->first();
        $phoneSupport = WhatsAppChatSetting::where('type', 'phone')->where('is_active', true)->first();
        $emailSupport = WhatsAppChatSetting::where('type', 'email')->where('is_active', true)->first();

        $faqs = Faq::active()->get();

        $chatbotSetting = ChatbotSetting::where('is_active', true)->first();
        $chatbotResponses = ChatbotResponse::active()->get();

        return Inertia::render('customer-support/page', [
            'supportHeader' => $supportHeader,
            'whatsappChat' => $whatsappChat,
            'phoneSupport' => $phoneSupport,
            'emailSupport' => $emailSupport,
            'faqs' => $faqs,
            'chatbotSetting' => $chatbotSetting,
            'chatbotResponses' => $chatbotResponses,
        ]);
    }
}
