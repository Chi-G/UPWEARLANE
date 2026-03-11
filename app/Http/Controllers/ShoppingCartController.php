<?php

namespace App\Http\Controllers;

use App\Models\CartSetting;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenApi\Attributes as OA;

class ShoppingCartController extends Controller
{
    #[OA\Get(
        path: "/api/shopping-cart",
        summary: "Display the shopping cart page data",
        tags: ["Shopping Cart"],
        responses: [
            new OA\Response(response: 200, description: "Cart data, promo codes, and settings")
        ]
    )]
    public function index()
    {
        // Get active cart settings
        $cartSettings = CartSetting::where('is_active', true)->first();

        // Get all active promo codes (for potential display/suggestions)
        $activePromoCodes = PromoCode::active()
            ->select('code', 'description', 'type', 'value', 'min_order', 'product_ids')
            ->get()
            ->map(function ($code) {
                return [
                    'code' => $code->code,
                    'description' => $code->description,
                    'type' => $code->type,
                    'value' => (float) $code->value,
                    'minOrder' => (float) $code->min_order,
                    'productIds' => $code->product_ids,
                ];
            });

        return Inertia::render('shopping-cart/page', [
            'cartSettings' => $cartSettings ? $cartSettings->getFormattedData() : null,
            'availablePromoCodes' => $activePromoCodes,
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/shopping-cart/validate-promo",
     *     summary="Validate a promo code",
     *     tags={"Shopping Cart"},
     *     @OA\Response(
     *         response=200,
     *         description="Promo code details if valid"
     *     ),
     *     @OA\Response(response=404, description="Invalid promo code"),
     *     @OA\Response(response=400, description="Promo code not applicable")
     * )
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
                'productIds' => $promoCode->product_ids,
            ],
        ]);
    }
}
