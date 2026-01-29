<?php

namespace App\Filament\Resources\ChatbotResponseResource\Pages;

use App\Filament\Resources\ChatbotResponseResource;
use Filament\Resources\Pages\EditRecord;

class EditChatbotResponse extends EditRecord
{
    protected static string $resource = ChatbotResponseResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
