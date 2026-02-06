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

    protected static ?string $navigationLabel = 'Chatbot Settings';

    protected static ?string $modelLabel = 'Chatbot Global Settings';

    protected static ?string $pluralModelLabel = 'Chatbot Global Settings';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            \Filament\Schemas\Components\Section::make()
                ->maxWidth(\Filament\Support\Enums\Width::Full)
                ->columnSpanFull()
                ->schema([
                    \Filament\Schemas\Components\Tabs::make('Chatbot Configuration')
                        ->tabs([
                            \Filament\Schemas\Components\Tabs\Tab::make('Landing Page Info')
                                ->schema([
                                    TextInput::make('header')
                                        ->placeholder('e.g. Interactive AI Assistant')
                                        ->columnSpanFull(),
                                    Textarea::make('description')
                                        ->placeholder('e.g. Quick answers for order status, returns, and tech setups.')
                                        ->columnSpanFull(),
                                ]),
                            \Filament\Schemas\Components\Tabs\Tab::make('Assistant Appearance')
                                ->schema([
                                    \Filament\Schemas\Components\Grid::make(2)
                                        ->schema([
                                            TextInput::make('bot_name')
                                                ->placeholder('e.g. AI Support Bot')
                                                ->required(),
                                            TextInput::make('bot_subtitle')
                                                ->placeholder('e.g. Powered by UpWearLane Intelligence')
                                                ->required(),
                                            TextInput::make('header_icon')
                                                ->placeholder('e.g. heroicon-o-cpu-chip')
                                                ->default('heroicon-o-cpu-chip'),
                                            Toggle::make('is_active')
                                                ->default(true),
                                        ]),
                                ]),
                            \Filament\Schemas\Components\Tabs\Tab::make('Default Messages')
                                ->schema([
                                    Textarea::make('welcome_message')
                                        ->required()
                                        ->columnSpanFull(),
                                    Textarea::make('default_response')
                                        ->required()
                                        ->columnSpanFull()
                                        ->placeholder('Fallback response when no intent is matched...'),
                                ]),
                        ])
                ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('bot_name')->searchable(),
            TextColumn::make('header')->searchable(),
            BooleanColumn::make('is_active'),
            TextColumn::make('updated_at')->dateTime()->sortable(),
        ])
        ->actions([
            \Filament\Actions\EditAction::make(),
            \Filament\Actions\DeleteAction::make(),
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
