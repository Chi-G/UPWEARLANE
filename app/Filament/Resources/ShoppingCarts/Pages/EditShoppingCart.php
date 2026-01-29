<?php

namespace App\Filament\Resources\ShoppingCarts\Pages;

use App\Filament\Resources\ShoppingCarts\ShoppingCartResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditShoppingCart extends EditRecord
{
    protected static string $resource = ShoppingCartResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
