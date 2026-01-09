<?php

namespace App\Http\Controllers;

use App\Models\CartSetting;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShoppingCartController extends Controller
{
    public function index()
    {
        // Get active cart settings
        $cartSettings = CartSetting::where('is_active', true)->first();

        // Get all active promo codes (for potential display/suggestions)
        $activePromoCodes = PromoCode::active()
            ->select('code', 'description', 'type', 'value', 'min_order')
            ->get();

        return Inertia::render('shopping-cart/page', [
            'cartSettings' => $cartSettings ? $cartSettings->getFormattedData() : null,
            'availablePromoCodes' => $activePromoCodes,
        ]);
    }

    /**
     * Validate a promo code
     */
    public function validatePromoCode(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'order_total' => 'required|numeric|min:0',
        ]);

        $promoCode = PromoCode::where('code', strtoupper($request->code))->first();

        if (!$promoCode) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid promo code',
            ], 404);
        }

        $validation = $promoCode->isValid($request->order_total);

        if (!$validation['valid']) {
            return response()->json([
                'success' => false,
                'message' => $validation['message'],
            ], 400);
        }

        return response()->json([
            'success' => true,
            'message' => $validation['message'],
            'promoCode' => [
                'code' => $promoCode->code,
                'description' => $promoCode->description,
                'type' => $promoCode->type,
                'value' => (float) $promoCode->value,
                'minOrder' => (float) $promoCode->min_order,
            ],
        ]);
    }
}
