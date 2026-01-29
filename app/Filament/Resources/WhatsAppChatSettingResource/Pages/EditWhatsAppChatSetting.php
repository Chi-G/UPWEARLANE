<?php

namespace App\Filament\Resources\WhatsAppChatSettingResource\Pages;

use App\Filament\Resources\WhatsAppChatSettingResource;
use Filament\Resources\Pages\EditRecord;

class EditWhatsAppChatSetting extends EditRecord
{
    protected static string $resource = WhatsAppChatSettingResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
