<?php

namespace App\Filament\Resources;

use App\Models\WhatsAppChatSetting;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use App\Filament\Resources\WhatsAppChatSettingResource\Pages;

class WhatsAppChatSettingResource extends Resource
{
    protected static ?string $model = WhatsAppChatSetting::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('phone_number')->required(),
            TextInput::make('message_template'),
            Toggle::make('is_active'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('phone_number')->searchable(),
            TextColumn::make('is_active'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListWhatsAppChatSettings::route('/'),
            'create' => Pages\CreateWhatsAppChatSetting::route('/create'),
            'edit' => Pages\EditWhatsAppChatSetting::route('/{record}/edit'),
        ];
    }
}
