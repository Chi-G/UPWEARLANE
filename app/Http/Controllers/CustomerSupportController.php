<?php

namespace App\Http\Controllers;

use App\Models\ChatbotResponse;
use App\Models\ChatbotSetting;
use App\Models\Faq;
use App\Models\SupportHeaderSetting;
use App\Models\WhatsAppChatSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerSupportController extends Controller
{
    public function index()
    {
        $supportHeader = SupportHeaderSetting::where('is_active', true)->first();

        $whatsappChat = WhatsAppChatSetting::where('is_active', true)->first();

        $faqs = Faq::active()->get();

        $chatbotSetting = ChatbotSetting::where('is_active', true)->first();
        $chatbotResponses = ChatbotResponse::active()->get();

        return Inertia::render('customer-support/page', [
            'supportHeader' => $supportHeader,
            'whatsappChat' => $whatsappChat,
            'faqs' => $faqs,
            'chatbotSetting' => $chatbotSetting,
            'chatbotResponses' => $chatbotResponses,
        ]);
    }
}
