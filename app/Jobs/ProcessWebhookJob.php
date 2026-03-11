<?php

namespace App\Jobs;

use App\Models\WebhookCall;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;

class ProcessWebhookJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public WebhookCall $webhookCall)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $payload = $this->webhookCall->payload;
            $provider = $this->webhookCall->provider;

            if ($provider === 'stripe') {
                $this->handleStripe($payload);
            }

            $this->webhookCall->update(['processed_at' => now()]);
        } catch (\Exception $e) {
            Log::error('Webhook processing failed: ' . $e->getMessage(), [
                'webhook_call_id' => $this->webhookCall->id,
                'trace' => $e->getTraceAsString()
            ]);
            $this->webhookCall->update(['exception' => $e->getMessage()]);
            throw $e;
        }
    }

    protected function handleStripe(array $payload)
    {
        $type = $payload['type'] ?? '';

        if ($type === 'payment_intent.succeeded') {
            $intent = $payload['data']['object'];
            $orderId = $intent['metadata']['order_id'] ?? null;

            if ($orderId) {
                $this->processOrderPayment($orderId, $intent['id'], 'stripe', 'card');
            }
        }
    }

    protected function processOrderPayment($orderId, $transactionId, $provider, $method)
    {
        $order = Order::find($orderId);
        if (!$order) {
            Log::warning("Order not found during webhook processing: {$orderId}");
            return;
        }

        DB::transaction(function () use ($order, $transactionId, $provider, $method) {
            $existingPayment = Payment::where('transaction_id', $transactionId)->first();

            if (!$existingPayment) {
                $payment = Payment::create([
                    'order_id' => $order->id,
                    'transaction_id' => $transactionId,
                    'payment_provider' => $provider,
                    'payment_method' => $method,
                    'amount' => $order->total,
                    'currency' => $order->currency,
                    'status' => 'completed',
                ]);

                // Record in Ledger
                Transaction::firstOrCreate(
                    ['reference' => $transactionId],
                    [
                        'user_id' => $order->user_id,
                        'order_id' => $order->id,
                        'amount' => $order->total,
                        'currency' => $order->currency,
                        'type' => 'credit',
                        'status' => 'completed',
                        'description' => 'Payment for order ' . $order->order_number . ' (Webhook)',
                        'metadata' => [
                            'provider' => $provider,
                            'method' => $method,
                        ],
                    ]
                );

                $order->update(['status' => 'processing']);

                // Send email
                try {
                    Mail::to($order->shippingAddress->email)
                        ->send(new OrderConfirmation($order, $payment));
                } catch (\Exception $e) {
                    Log::error('Failed to send order confirmation email from webhook: ' . $e->getMessage());
                }
            }
        });
    }
}
