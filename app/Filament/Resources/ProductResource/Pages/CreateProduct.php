<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Filament\Resources\ProductResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProduct extends CreateRecord
{
    protected static string $resource = ProductResource::class;

    protected function afterCreate(): void
    {
        $record = $this->getRecord();
        $selectedPromoId = $this->data['selected_promo_code'] ?? null;

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
