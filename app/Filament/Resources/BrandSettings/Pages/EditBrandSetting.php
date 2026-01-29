<?php

namespace App\Filament\Resources\BrandSettings\Pages;

use App\Filament\Resources\BrandSettings\BrandSettingResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditBrandSetting extends EditRecord
{
    protected static string $resource = BrandSettingResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
