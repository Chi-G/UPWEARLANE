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
use Filament\Support\Enums\Width;
use App\Filament\Resources\ChatbotResponseResource\Pages;

class ChatbotResponseResource extends Resource
{
    protected static ?string $navigationLabel = 'Chatbot Knowledge Base';

    protected static ?string $modelLabel = 'Chatbot Response';

    protected static ?string $pluralModelLabel = 'Chatbot Knowledge Base';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            \Filament\Schemas\Components\Section::make('Response Intelligence')
                ->maxWidth(Width::Full)
                ->columnSpanFull()
                ->description('Define how the chatbot should respond to specific keywords or intents.')
                ->schema([
                    TextInput::make('keyword')
                        ->label('Keyword / Intent')
                        ->placeholder('e.g. shipping, returns, hello')
                        ->required()
                        ->columnSpanFull(),
                    Textarea::make('response')
                        ->label('Chatbot Response')
                        ->placeholder('The message the bot will send...')
                        ->required()
                        ->rows(4)
                        ->columnSpanFull(),
                    \Filament\Schemas\Components\Grid::make(2)
                        ->schema([
                            TextInput::make('priority')
                                ->numeric()
                                ->default(0)
                                ->helperText('Higher priority responses are matched first.'),
                            Toggle::make('is_active')
                                ->label('Enable Response')
                                ->default(true),
                        ]),
                ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('keyword')
                ->label('Intent')
                ->searchable()
                ->sortable(),
            TextColumn::make('response')
                ->limit(50)
                ->searchable(),
            TextColumn::make('priority')->sortable(),
            BooleanColumn::make('is_active')->label('Active'),
        ])
        ->actions([
            \Filament\Actions\EditAction::make(),
            \Filament\Actions\DeleteAction::make(),
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
