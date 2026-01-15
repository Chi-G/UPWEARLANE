<?php

namespace App\Filament\Resources;

use App\Models\ChatbotSetting;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use App\Filament\Resources\ChatbotSettingResource\Pages;

class ChatbotSettingResource extends Resource
{
    protected static ?string $model = ChatbotSetting::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-cpu-chip';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('name')->required(),
            Textarea::make('value'),
            Toggle::make('is_active'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('name')->searchable(),
            BooleanColumn::make('is_active'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListChatbotSettings::route('/'),
            'create' => Pages\CreateChatbotSetting::route('/create'),
            'edit' => Pages\EditChatbotSetting::route('/{record}/edit'),
        ];
    }
}
