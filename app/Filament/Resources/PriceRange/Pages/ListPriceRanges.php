<?php

namespace App\Filament\Resources\PriceRange\Pages;

use App\Filament\Resources\PriceRange\PriceRangeResource;
use Filament\Resources\Pages\ListRecords;

class ListPriceRanges extends ListRecords
{
    protected static string $resource = PriceRangeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make(),
        ];
    }
}
