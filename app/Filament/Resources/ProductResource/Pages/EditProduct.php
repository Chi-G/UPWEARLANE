<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Resources\Pages\EditRecord;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function afterSave(): void
    {
        $record = $this->getRecord();
        $selectedPromoId = $this->data['selected_promo_code'] ?? null;

        // 1. Remove this product from ALL active promo codes first
        $activePromos = \App\Models\PromoCode::active()->get();
        
        foreach ($activePromos as $promo) {
            $ids = $promo->product_ids ?? [];
            if (in_array($record->id, $ids)) {
                $ids = array_values(array_diff($ids, [$record->id]));
                $promo->product_ids = $ids;
                $promo->save();
            }
        }

        // 2. Add to new promo code if selected
        if ($selectedPromoId) {
            $promo = \App\Models\PromoCode::find($selectedPromoId);
            if ($promo) {
                $ids = $promo->product_ids ?? [];
                if (!in_array($record->id, $ids)) {
                    $ids[] = $record->id;
                    $promo->product_ids = array_values($ids);
                    $promo->save();
                }
            }
        }
    }
}
  