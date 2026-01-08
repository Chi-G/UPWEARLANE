<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::findOrFail($validated['order_id']);

        Stripe::setApiKey(config('services.stripe.secret'));

        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => (int) ($order->total * 100),
                'currency' => strtolower($order->currency),
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                ],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function confirmPayment(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_intent_id' => 'required|string',
        ]);

        $order = Order::findOrFail($validated['order_id']);

        Payment::create([
            'order_id' => $order->id,
            'payment_method' => 'card',
            'transaction_id' => $validated['payment_intent_id'],
            'amount' => $order->total,
            'currency' => $order->currency,
            'status' => 'completed',
            'payment_gateway' => 'stripe',
        ]);

        $order->update(['status' => 'processing']);

        return response()->json([
            'success' => true,
            'message' => 'Payment confirmed',
        ]);
    }
}
