<?php

namespace App\Filament\Resources\ShoppingCarts\Pages;

use App\Filament\Resources\ShoppingCarts\ShoppingCartResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListShoppingCarts extends ListRecords
{
    protected static string $resource = ShoppingCartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
