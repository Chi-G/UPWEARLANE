<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use App\Models\Address;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Checkout\Session as StripeSession;

class PaymentController extends Controller
{
    /**
     * Get currency conversion rates (units per 1 USD).
     */
    private function getConversionRates(): array
    {
        // Try dynamic rates from database; fall back to sensible defaults
        try {
            $rates = \App\Models\CurrencyRate::getConversionRates();
            return array_merge([
                'USD' => 1.0,
                'GBP' => 0.79,
                'CAD' => 1.36,
                'NGN' => 1650.0,
            ], $rates);
        } catch (\Throwable $e) {
            return [
                'USD' => 1.0,
                'GBP' => 0.79,
                'CAD' => 1.36,
                'NGN' => 1650.0,
            ];
        }
    }

    /**
     * Convert an amount between currencies using units-per-USD rates.
     */
    private function convertAmount(float $amount, string $fromCurrency, string $toCurrency, array $rates): float
    {
        $from = strtoupper($fromCurrency);
        $to = strtoupper($toCurrency);
        $fromRate = $rates[$from] ?? 1.0;
        $toRate = $rates[$to] ?? 1.0;
        // amount_in_usd = amount / rate[from]; amount_in_target = usd * rate[to]
        $amountInUsd = $amount / max($fromRate, 1e-9);
        return $amountInUsd * $toRate;
    }

    /**
     * Stripe minimum charge thresholds per currency for card/checkout.
     */
    private function getStripeMinimums(): array
    {
        return [
            'USD' => 0.50,
            'GBP' => 0.30,
            'CAD' => 0.50,
        ];
    }

    /**
     * Create order and payment intent from checkout flow
     */
    public function createPaymentIntent(Request $request)
    {
        $validated = $request->validate([
            // Cart items
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|string',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.currency' => 'required|string',

            // Shipping information
            'shipping_address' => 'required|array',
            'shipping_address.fullName' => 'required|string|max:255',
            'shipping_address.email' => 'required|email|max:255',
            'shipping_address.phone' => 'required|string|max:20',
            'shipping_address.address' => 'required|string|max:500',
            'shipping_address.city' => 'required|string|max:100',
            'shipping_address.state' => 'required|string|max:100',
            'shipping_address.postalCode' => 'required|string|max:20',
            'shipping_address.country' => 'required|string|max:100',

            // Shipping method
            'shipping_method' => 'required|array',
            'shipping_method.id' => 'required|string',
            'shipping_method.name' => 'required|string',
            'shipping_method.cost' => 'required|numeric|min:0',
            'shipping_method.delivery' => 'required|string',

            // Currency and totals
            'currency' => 'required|in:USD,GBP,CAD,NGN',
            'subtotal' => 'required|numeric|min:0',
            'shipping_cost' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Create shipping address
            $shippingAddress = Address::create([
                'user_id' => Auth::id(),
                'type' => 'shipping',
                'full_name' => $validated['shipping_address']['fullName'],
                'email' => $validated['shipping_address']['email'],
                'phone' => $validated['shipping_address']['phone'],
                'address_line_1' => $validated['shipping_address']['address'],
                'city' => $validated['shipping_address']['city'],
                'state' => $validated['shipping_address']['state'],
                'postal_code' => $validated['shipping_address']['postalCode'],
                'country' => $validated['shipping_address']['country'],
            ]);

            // Use same address for billing (or validate billing_address if provided)
            $billingAddress = $shippingAddress;

            // Calculate totals
            $subtotal = $validated['subtotal'];
            $shippingCost = $validated['shipping_cost'];
            $tax = $validated['tax'] ?? ($subtotal * 0.1); // 10% tax if not provided
            $total = $validated['total'];

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_number' => 'UWL-' . date('YmdHis') . '-' . strtoupper(substr(uniqid(), -4)),
                'status' => 'pending',
                'currency' => $validated['currency'],
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'tax' => $tax,
                'discount' => 0,
                'total' => $total,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'shipping_method' => $validated['shipping_method']['name'],
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                // Find product by ID (remove any non-numeric characters if needed)
                $productId = is_numeric($item['id']) ? $item['id'] : null;
                $product = $productId ? Product::find($productId) : null;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $productId,
                    'product_variant_id' => null,
                    'product_name' => $item['name'],
                    'product_sku' => $product?->sku ?? 'N/A',
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                    'total_price' => $item['price'] * $item['quantity'],
                    'attributes' => json_encode([
                        'currency' => $item['currency'] ?? 'USD',
                        'variations' => $item['variations'] ?? null,
                    ]),
                ]);

                // Update product stock if product exists
                if ($product) {
                    $product->decrement('stock_quantity', $item['quantity']);
                    $product->increment('sold_count', $item['quantity']);
                }
            }

            // Create Stripe Payment Intent
            Stripe::setApiKey(config('services.stripe.secret'));

            // Determine Stripe currency and convert if needed
            $originalCurrency = strtoupper($validated['currency']);
            $stripeCurrency = $originalCurrency === 'NGN' ? 'USD' : $originalCurrency;
            $rates = $this->getConversionRates();
            $stripeAmount = $originalCurrency === $stripeCurrency
                ? $total
                : $this->convertAmount($total, $originalCurrency, $stripeCurrency, $rates);

            // Enforce Stripe minimums to avoid provider errors
            $minimums = $this->getStripeMinimums();
            $minStripeAmount = $minimums[$stripeCurrency] ?? 0.50; // safe default
            if ($stripeAmount < $minStripeAmount) {
                // Compute required minimum in user's original currency
                $requiredInOriginal = $this->convertAmount($minStripeAmount, $stripeCurrency, $originalCurrency, $rates);
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'error' => sprintf(
                        'Minimum order is %s %.2f (equivalent to %s %.2f) to process card payments.',
                        $originalCurrency,
                        $requiredInOriginal,
                        $stripeCurrency,
                        $minStripeAmount
                    )
                ], 422);
            }

            $paymentIntent = PaymentIntent::create([
                'amount' => (int) ($stripeAmount * 100), // Stripe uses cents
                'currency' => strtolower($stripeCurrency),
                'automatic_payment_methods' => ['enabled' => true],
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'customer_email' => $validated['shipping_address']['email'],
                    'original_currency' => $validated['currency'],
                    'original_amount' => $total,
                ],
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'clientSecret' => $paymentIntent->client_secret,
                'order_id' => $order->id,
                'order_number' => $order->order_number,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Confirm payment and update order status
     */
    public function confirmPayment(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'payment_intent_id' => 'required|string',
            'payment_method' => 'required|string|in:card,crypto,google-pay,apple-pay',
        ]);

        try {
            $order = Order::findOrFail($validated['order_id']);

            // Verify payment with Stripe
            Stripe::setApiKey(config('services.stripe.secret'));
            $paymentIntent = PaymentIntent::retrieve($validated['payment_intent_id']);

            if ($paymentIntent->status === 'succeeded') {
                // Check if payment record already exists
                $existingPayment = Payment::where('transaction_id', $validated['payment_intent_id'])->first();

                if (!$existingPayment) {
                    // Create payment record
                    $payment = Payment::create([
                        'order_id' => $order->id,
                        'transaction_id' => $validated['payment_intent_id'],
                        'payment_provider' => 'stripe',
                        'payment_method' => $validated['payment_method'],
                        'amount' => $order->total,
                        'currency' => $order->currency,
                        'status' => 'completed',
                    ]);

                    // Update order status
                    $order->update(['status' => 'processing']);

                    // Send order confirmation email
                    try {
                        Mail::to($order->shippingAddress->email)
                            ->send(new OrderConfirmation($order, $payment));
                    } catch (\Exception $e) {
                        // Log error but don't fail the response
                        Log::error('Failed to send order confirmation email: ' . $e->getMessage());
                    }
                } else {
                    $payment = $existingPayment;
                }

                return response()->json([
                    'success' => true,
                    'message' => 'Payment confirmed successfully',
                    'order' => $order->load('items', 'shippingAddress'),
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Payment verification failed',
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Create Stripe Checkout Session for crypto payments
     */
    public function createCheckoutSession(Request $request)
    {
        $validated = $request->validate([
            // Cart items
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|string',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.currency' => 'required|string',

            // Shipping information
            'shipping_address' => 'required|array',
            'shipping_address.fullName' => 'required|string|max:255',
            'shipping_address.email' => 'required|email|max:255',
            'shipping_address.phone' => 'required|string|max:20',
            'shipping_address.address' => 'required|string|max:500',
            'shipping_address.city' => 'required|string|max:100',
            'shipping_address.state' => 'required|string|max:100',
            'shipping_address.postalCode' => 'required|string|max:20',
            'shipping_address.country' => 'required|string|max:100',

            // Shipping method
            'shipping_method' => 'required|array',
            'shipping_method.id' => 'required|string',
            'shipping_method.name' => 'required|string',
            'shipping_method.cost' => 'required|numeric|min:0',
            'shipping_method.delivery' => 'required|string',

            // Currency and totals
            'currency' => 'required|in:USD,GBP,CAD,NGN',
            'subtotal' => 'required|numeric|min:0',
            'shipping_cost' => 'required|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'total' => 'required|numeric|min:0',
            'payment_method' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            // Create shipping address
            $shippingAddress = Address::create([
                'user_id' => Auth::id(),
                'type' => 'shipping',
                'full_name' => $validated['shipping_address']['fullName'],
                'email' => $validated['shipping_address']['email'],
                'phone' => $validated['shipping_address']['phone'],
                'address_line_1' => $validated['shipping_address']['address'],
                'city' => $validated['shipping_address']['city'],
                'state' => $validated['shipping_address']['state'],
                'postal_code' => $validated['shipping_address']['postalCode'],
                'country' => $validated['shipping_address']['country'],
            ]);

            // Use same address for billing
            $billingAddress = $shippingAddress;

            // Calculate totals
            $subtotal = $validated['subtotal'];
            $shippingCost = $validated['shipping_cost'];
            $tax = $validated['tax'] ?? ($subtotal * 0.1);
            $total = $validated['total'];

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_number' => 'UWL-' . date('YmdHis') . '-' . strtoupper(substr(uniqid(), -4)),
                'status' => 'pending',
                'currency' => $validated['currency'],
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'tax' => $tax,
                'discount' => 0,
                'total' => $total,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'shipping_method' => $validated['shipping_method']['name'],
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                $productId = is_numeric($item['id']) ? $item['id'] : null;
                $product = $productId ? Product::find($productId) : null;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $productId,
                    'product_variant_id' => null,
                    'product_name' => $item['name'],
                    'product_sku' => $product?->sku ?? 'N/A',
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['price'],
                    'total_price' => $item['price'] * $item['quantity'],
                    'attributes' => json_encode([
                        'currency' => $item['currency'] ?? 'USD',
                        'variations' => $item['variations'] ?? null,
                    ]),
                ]);

                // Update product stock
                if ($product) {
                    $product->decrement('stock_quantity', $item['quantity']);
                    $product->increment('sold_count', $item['quantity']);
                }
            }

            // Create Stripe Checkout Session for crypto/card via Checkout
            Stripe::setApiKey(config('services.stripe.secret'));

            // Determine Stripe currency and convert amounts for Checkout
            $originalCurrency = strtoupper($validated['currency']);
            $stripeCurrency = $originalCurrency === 'NGN' ? 'USD' : $originalCurrency;
            $rates = $this->getConversionRates();

            // Prepare line items with amounts in Stripe currency
            $lineItems = [];
            $stripeTotal = 0.0;
            foreach ($validated['items'] as $item) {
                $unit = (float) $item['price'];
                $unitInStripe = $originalCurrency === $stripeCurrency
                    ? $unit
                    : $this->convertAmount($unit, $originalCurrency, $stripeCurrency, $rates);
                $lineItems[] = [
                    'price_data' => [
                        'currency' => strtolower($stripeCurrency),
                        'product_data' => [
                            'name' => $item['name'],
                        ],
                        'unit_amount' => (int) round($unitInStripe * 100),
                    ],
                    'quantity' => $item['quantity'],
                ];
                $stripeTotal += $unitInStripe * (int) $item['quantity'];
            }

            // Add shipping
            if ($shippingCost > 0) {
                $shippingInStripe = $originalCurrency === $stripeCurrency
                    ? $shippingCost
                    : $this->convertAmount($shippingCost, $originalCurrency, $stripeCurrency, $rates);
                $lineItems[] = [
                    'price_data' => [
                        'currency' => strtolower($stripeCurrency),
                        'product_data' => [
                            'name' => 'Shipping - ' . $validated['shipping_method']['name'],
                        ],
                        'unit_amount' => (int) round($shippingInStripe * 100),
                    ],
                    'quantity' => 1,
                ];
                $stripeTotal += $shippingInStripe;
            }

            // Add tax
            if ($tax > 0) {
                $taxInStripe = $originalCurrency === $stripeCurrency
                    ? $tax
                    : $this->convertAmount($tax, $originalCurrency, $stripeCurrency, $rates);
                $lineItems[] = [
                    'price_data' => [
                        'currency' => strtolower($stripeCurrency),
                        'product_data' => [
                            'name' => 'Tax',
                        ],
                        'unit_amount' => (int) round($taxInStripe * 100),
                    ],
                    'quantity' => 1,
                ];
                $stripeTotal += $taxInStripe;
            }

            // Enforce Stripe minimums for Checkout
            $minimums = $this->getStripeMinimums();
            $minStripeAmount = $minimums[$stripeCurrency] ?? 0.50;
            if ($stripeTotal < $minStripeAmount) {
                $requiredInOriginal = $this->convertAmount($minStripeAmount, $stripeCurrency, $originalCurrency, $rates);
                DB::rollBack();
                return response()->json([
                    'success' => false,
                    'error' => sprintf(
                        'Minimum order is %s %.2f (equivalent to %s %.2f) to start Checkout.',
                        $originalCurrency,
                        $requiredInOriginal,
                        $stripeCurrency,
                        $minStripeAmount
                    )
                ], 422);
            }

            // Determine payment method types based on selected method
            // For crypto, we need to enable customer_balance for Stripe crypto payments
            $paymentMethodTypes = in_array($validated['payment_method'], ['bitcoin', 'ethereum', 'usdc'])
                ? ['card']  // Stripe Checkout doesn't support direct crypto, use card for now
                : ['card'];

            $checkoutSession = StripeSession::create([
                'payment_method_types' => $paymentMethodTypes,
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => url('/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=' . $order->id),
                'cancel_url' => url('/checkout-flow?canceled=true'),
                'customer_email' => $validated['shipping_address']['email'],
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'payment_method' => $validated['payment_method'],
                ],
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'checkout_url' => $checkoutSession->url,
                'session_id' => $checkoutSession->id,
                'order_id' => $order->id,
                'order_number' => $order->order_number,
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout session creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle successful checkout session
     */
    public function checkoutSuccess(Request $request)
    {
        $sessionId = $request->query('session_id');
        $orderId = $request->query('order_id');

        if (!$sessionId || !$orderId) {
            return redirect('/')->with('error', 'Invalid checkout session');
        }

        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            $session = StripeSession::retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                $order = Order::findOrFail($orderId);

                // Check if payment record already exists
                $existingPayment = Payment::where('transaction_id', $session->payment_intent)->first();

                if (!$existingPayment) {
                    // Create payment record
                    $payment = Payment::create([
                        'order_id' => $order->id,
                        'transaction_id' => $session->payment_intent,
                        'payment_provider' => 'stripe',
                        'payment_method' => $session->metadata->payment_method ?? 'card',
                        'amount' => $order->total,
                        'currency' => $order->currency,
                        'status' => 'completed',
                    ]);

                    // Update order status
                    $order->update(['status' => 'processing']);

                    // Send order confirmation email
                    try {
                        Mail::to($order->shippingAddress->email)
                            ->send(new OrderConfirmation($order, $payment));
                    } catch (\Exception $e) {
                        // Log error but don't fail the response
                        Log::error('Failed to send order confirmation email: ' . $e->getMessage());
                    }
                } else {
                    $payment = $existingPayment;
                }

                // Clear cart
                return inertia('checkout-flow/success/page', [
                    'order' => $order->load('items', 'shippingAddress', 'billingAddress'),
                    'payment' => [
                        'method' => $session->metadata->payment_method ?? 'card',
                        'order_id' => $order->id,
                        'order_number' => $order->order_number,
                    ],
                ]);
            }

            return redirect('/checkout-flow')->with('error', 'Payment not completed');

        } catch (\Exception $e) {
            return redirect('/')->with('error', 'Error processing payment: ' . $e->getMessage());
        }
    }
}
