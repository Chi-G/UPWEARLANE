<?php

namespace App\Filament\Resources\PriceRange\Pages;

use App\Filament\Resources\PriceRange\PriceRangeResource;
use Filament\Resources\Pages\EditRecord;

class EditPriceRange extends EditRecord
{
    protected static string $resource = PriceRangeResource::class;

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
