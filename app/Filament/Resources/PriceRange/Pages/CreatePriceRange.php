<?php

namespace App\Filament\Resources\PriceRange\Pages;

use App\Filament\Resources\PriceRange\PriceRangeResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePriceRange extends CreateRecord
{
    protected static string $resource = PriceRangeResource::class;

    protected function getRedirectUrl(): string
    {
        return static::getResource()::getUrl('index');
    }
}
