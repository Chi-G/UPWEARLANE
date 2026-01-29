<?php

namespace App\Filament\Resources\CurrencyRateResource\Pages;

use App\Filament\Resources\CurrencyRateResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCurrencyRate extends EditRecord
{
    protected static string $resource = CurrencyRateResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
