<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;

use App\Models\Product;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\BadgeColumn;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?int $navigationSort = 2;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-shopping-bag';

    protected static \UnitEnum|string|null $navigationGroup = 'Shop Management';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('name')->required()->maxLength(255),
            TextInput::make('slug')->disabled(),
            Select::make('category_id')->relationship('category', 'name')->required(),
            Textarea::make('description'),
            Textarea::make('short_description'),
            TextInput::make('base_price')->numeric()->required(),
            TextInput::make('original_price')->numeric(),
            TextInput::make('discount_percentage')->numeric(),
            TextInput::make('sku')->maxLength(100),
            TextInput::make('stock_quantity')->numeric(),
            Toggle::make('is_new'),
            Toggle::make('is_featured'),
            Toggle::make('is_bestseller'),
            Toggle::make('is_pre_order'),
            Toggle::make('is_active'),
            TextInput::make('brand')->maxLength(100),
            KeyValue::make('specifications'),
            DatePicker::make('launch_date'),
            FileUpload::make('images')->multiple()->directory('products/images'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('category.name')->label('Category'),
                TextColumn::make('base_price')->money(),
                BooleanColumn::make('is_active'),
                BooleanColumn::make('is_featured'),
                BooleanColumn::make('is_bestseller'),
                BooleanColumn::make('is_new'),
                BadgeColumn::make('stock_quantity'),
            ])
            ->filters([
                // Add filters as needed
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
