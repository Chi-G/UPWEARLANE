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
use Filament\Schemas\Components\Utilities\Get;
use Filament\Support\Enums\Width;

class WhatsAppChatSettingResource extends Resource
{
    protected static ?string $model = WhatsAppChatSetting::class;

    protected static ?string $slug = 'whatsapp-chat-settings';

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationLabel = 'WhatsApp, Email & Phone';

    protected static ?string $modelLabel = 'Support Channel';

    protected static ?string $pluralModelLabel = 'WhatsApp, Email & Phone Settings';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            \Filament\Schemas\Components\Section::make()
                ->maxWidth(\Filament\Support\Enums\Width::Full)
                ->columnSpanFull()
                ->schema([
                    \Filament\Forms\Components\Select::make('type')
                        ->options([
                            'whatsapp' => 'WhatsApp',
                            'phone' => 'Direct Phone Support',
                            'email' => 'Email Support',
                        ])
                        ->required()
                        ->default('whatsapp')
                        ->reactive()
                        ->columnSpanFull(),
                    
                    TextInput::make('title')
                        ->required()
                        ->columnSpanFull(),
                    
                    \Filament\Forms\Components\Textarea::make('description')
                        ->required()
                        ->columnSpanFull(),

                    TextInput::make('phone_number')
                        ->tel()
                        ->label('Phone Number')
                        ->hidden(fn (Get $get) => $get('type') === 'email')
                        ->required(fn (Get $get) => $get('type') !== 'email')
                        ->columnSpanFull(),

                    TextInput::make('email')
                        ->email()
                        ->label('Email Address')
                        ->hidden(fn (Get $get) => $get('type') !== 'email')
                        ->required(fn (Get $get) => $get('type') === 'email')
                        ->columnSpanFull(),

                    \Filament\Forms\Components\TagsInput::make('features')
                        ->label('Features (Bullets)')
                        ->hidden(fn (Get $get) => $get('type') !== 'whatsapp')
                        ->columnSpanFull(),

                    TextInput::make('button_text')
                        ->label('Button Text (e.g. Chat on WhatsApp)')
                        ->hidden(fn (Get $get) => $get('type') !== 'whatsapp')
                        ->columnSpanFull(),

                    Toggle::make('is_active')
                        ->label('Is Active')
                        ->default(true)
                        ->columnSpanFull(),
                ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('title')->searchable()->sortable(),
            TextColumn::make('type')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'whatsapp' => 'success',
                    'phone' => 'warning',
                    'email' => 'info',
                    default => 'gray',
                }),
            TextColumn::make('phone_number')->placeholder('-'),
            TextColumn::make('email')->placeholder('-'),
            Tables\Columns\IconColumn::make('is_active')
                ->boolean(),
        ])
        ->actions([
            \Filament\Actions\EditAction::make(),
            \Filament\Actions\DeleteAction::make(),
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
