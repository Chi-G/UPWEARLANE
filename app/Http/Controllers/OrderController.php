<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Create new order from cart
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.variant_id' => 'nullable|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|array',
            'billing_address' => 'required|array',
            'shipping_method' => 'required|string',
            'currency' => 'required|in:USD,GBP,CAD,NGN',
        ]);

        try {
            DB::beginTransaction();

            // Create shipping address
            $shippingAddress = Address::create([
                'user_id' => auth()->id(),
                'type' => 'shipping',
                ...$validated['shipping_address']
            ]);

            // Create billing address
            $billingAddress = Address::create([
                'user_id' => auth()->id(),
                'type' => 'billing',
                ...$validated['billing_address']
            ]);

            // Calculate totals
            $subtotal = 0;
            $orderItems = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Check stock
                if ($product->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for {$product->name}");
                }

                $unitPrice = $product->discounted_price;
                $totalPrice = $unitPrice * $item['quantity'];
                $subtotal += $totalPrice;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_variant_id' => $item['variant_id'] ?? null,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ];

                // Reduce stock
                $product->decrement('stock_quantity', $item['quantity']);
                $product->increment('sold_count', $item['quantity']);
            }

            // Calculate shipping (simplified - you'd have real logic here)
            $shippingCost = $this->calculateShipping($validated['shipping_method'], $subtotal);
            $tax = $subtotal * 0.1; // 10% tax (simplified)
            $total = $subtotal + $shippingCost + $tax;

            // Create order
            $order = Order::create([
                'user_id' => auth()->id(),
                'status' => 'pending',
                'currency' => $validated['currency'],
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'tax' => $tax,
                'total' => $total,
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $billingAddress->id,
                'shipping_method' => $validated['shipping_method'],
            ]);

            // Create order items
            foreach ($orderItems as $item) {
                $order->items()->create($item);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'order' => $order->load('items'),
                'message' => 'Order created successfully',
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 422);
        }
    }

    private function calculateShipping($method, $subtotal)
    {
        // Simplified shipping calculation
        return match ($method) {
            'standard' => 10.00,
            'express' => 25.00,
            'overnight' => 50.00,
            default => 0,
        };
    }
}
