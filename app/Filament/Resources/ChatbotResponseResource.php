<?php

namespace App\Filament\Resources;

use App\Models\ChatbotResponse;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use App\Filament\Resources\ChatbotResponseResource\Pages;

class ChatbotResponseResource extends Resource
{
    protected static ?string $model = ChatbotResponse::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-chat-bubble-bottom-center-text';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('intent')->required(),
            Textarea::make('response')->required(),
            Toggle::make('is_active'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('intent')->searchable(),
            BooleanColumn::make('is_active'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListChatbotResponses::route('/'),
            'create' => Pages\CreateChatbotResponse::route('/create'),
            'edit' => Pages\EditChatbotResponse::route('/{record}/edit'),
        ];
    }
}
