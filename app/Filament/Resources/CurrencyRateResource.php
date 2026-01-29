<?php

namespace App\Filament\Resources;

use App\Models\CurrencyRate;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use App\Filament\Resources\CurrencyRateResource\Pages;

class CurrencyRateResource extends Resource
{
    protected static ?string $model = CurrencyRate::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-currency-dollar';

    protected static \UnitEnum|string|null $navigationGroup = 'System Management';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('code')
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(3)
                ->placeholder('e.g. USD'),
            TextInput::make('name')
                ->required()
                ->maxLength(255)
                ->placeholder('e.g. US Dollar'),
            TextInput::make('symbol')
                ->required()
                ->maxLength(10)
                ->placeholder('e.g. $'),
            TextInput::make('rate')
                ->required()
                ->numeric()
                ->step('0.0001')
                ->helperText('Exchange rate relative to base currency (e.g. 1 USD = NGN rate)'),
            Toggle::make('is_active')
                ->label('Active')
                ->default(true),
            DateTimePicker::make('last_updated')
                ->disabled()
                ->dehydrated(false)
                ->visibleOn('edit'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('code')->sortable()->searchable(),
                TextColumn::make('name')->sortable()->searchable(),
                TextColumn::make('symbol'),
                TextColumn::make('rate')->sortable(),
                IconColumn::make('is_active')
                    ->boolean()
                    ->label('Active'),
                TextColumn::make('last_updated')
                    ->dateTime()
                    ->sortable(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCurrencyRates::route('/'),
            'create' => Pages\CreateCurrencyRate::route('/create'),
            'edit' => Pages\EditCurrencyRate::route('/{record}/edit'),
        ];
    }
}
