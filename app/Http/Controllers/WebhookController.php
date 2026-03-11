<?php

namespace App\Http\Controllers;

use App\Models\WebhookCall;
use App\Jobs\ProcessWebhookJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OpenApi\Attributes as OA;

class WebhookController extends Controller
{
    #[OA\Post(
        path: "/api/webhooks/stripe",
        summary: "Handle incoming Stripe webhooks",
        tags: ["Webhooks"],
        responses: [
            new OA\Response(response: 200, description: "Webhook processed")
        ]
    )]
    public function handleStripe(Request $request)
    {
        $payload = $request->all();
        
        // Log the webhook call for reliability
        $webhookCall = WebhookCall::create([
            'provider' => 'stripe',
            'payload' => $payload,
        ]);

        // Dispatch job for async processing
        ProcessWebhookJob::dispatch($webhookCall);

        return response()->json(['status' => 'success']);
    }

    #[OA\Post(
        path: "/api/webhooks/paystack",
        summary: "Handle incoming Paystack webhooks",
        tags: ["Webhooks"],
        responses: [
            new OA\Response(response: 200, description: "Webhook processed")
        ]
    )]
    public function handlePaystack(Request $request)
    {
        $payload = $request->all();

        $webhookCall = WebhookCall::create([
            'provider' => 'paystack',
            'payload' => $payload,
        ]);

        ProcessWebhookJob::dispatch($webhookCall);

        return response()->json(['status' => 'success']);
    }
}
