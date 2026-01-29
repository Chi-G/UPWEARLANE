<?php

namespace App\Filament\Resources;

use App\Models\PromoCode;
use App\Models\Product;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use App\Filament\Resources\PromoCodeResource\Pages;


class PromoCodeResource extends Resource
{
    protected static ?string $model = PromoCode::class;

    protected static ?int $navigationSort = 4;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-ticket';

    protected static \UnitEnum|string|null $navigationGroup = 'Catalog Management';


    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('code')->required()->maxLength(20),
            Textarea::make('description'),
            Select::make('type')->options([
                'fixed' => 'Fixed',
                'percentage' => 'Percent',
                'shipping' => 'Shipping',
            ])->required(),
            TextInput::make('value')->numeric()->required(),
            TextInput::make('min_order')->numeric(),
            Select::make('product_ids')
                ->label('Applicable Products')
                ->multiple()
                ->options(Product::all()->pluck('name', 'id'))
                ->searchable()
                ->placeholder('Leave empty to apply to all products')
                ->columnSpanFull(),
            Toggle::make('is_active'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('code')->searchable(),
            TextColumn::make('type'),
            TextColumn::make('value'),
            BooleanColumn::make('is_active'),
        ])
        ->actions([
            \Filament\Actions\DeleteAction::make(),
            \Filament\Actions\EditAction::make(),
        ])
        ->bulkActions([
            \Filament\Actions\DeleteBulkAction::make(),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPromoCodes::route('/'),
            'create' => Pages\CreatePromoCode::route('/create'),
            'edit' => Pages\EditPromoCode::route('/{record}/edit'),
        ];
    }
}
