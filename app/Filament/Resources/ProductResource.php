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
use Filament\Schemas\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\BadgeColumn;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?int $navigationSort = 2;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-shopping-bag';

    protected static \UnitEnum|string|null $navigationGroup = 'Catalog Management';

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
            Select::make('selected_promo_code')
                ->label('Active Promo Code')
                ->options(function () {
                    return \App\Models\PromoCode::active()->pluck('code', 'id');
                })
                ->searchable()
                ->helperText('Select an active promo code to apply to this product.')
                ->dehydrated(false)
                ->afterStateHydrated(function ($component, $record) {
                    if (!$record) return;
                    $promo = \App\Models\PromoCode::active()
                        ->whereJsonContains('product_ids', $record->id)
                        ->first();
                    if ($promo) {
                        $component->state($promo->id);
                    }
                }),
            TextInput::make('sku')->maxLength(100),
            TextInput::make('stock_quantity')->numeric(),
            Toggle::make('is_new'),
            Toggle::make('is_featured'),
            Toggle::make('is_bestseller'),
            Toggle::make('is_pre_order'),
            Toggle::make('is_active'),
            Select::make('brand_setting_id')
                ->relationship('brandSetting', 'brand_name')
                ->label('Brand')
                ->searchable()
                ->preload(),
            TextInput::make('brand')
                ->label('Legacy Brand (Text)')
                ->maxLength(100),
            Section::make('Product Options')
                ->schema([
                    Repeater::make('colors')
                        ->relationship('colors')
                        ->schema([
                            TextInput::make('name')->required()->placeholder('e.g. Midnight Black'),
                            TextInput::make('hex_code')->placeholder('e.g. #000000'),
                        ])
                        ->columns(2)
                        ->grid(2)
                        ->collapsible(),
                ]),
            Section::make('Product Images')
                ->schema([
                    Repeater::make('images')
                        ->relationship('images')
                        ->schema([
                            FileUpload::make('image_path')
                                ->image()
                                ->required()
                                ->directory('products/images')
                                ->disk('public_dir')
                                ->visibility('public'),
                            TextInput::make('alt_text')
                                ->label('Alt Text')
                                ->maxLength(255),
                            Toggle::make('is_primary')
                                ->label('Primary Image')
                                ->default(false)
                                ->inline(false),
                        ])
                        ->grid(2)
                        ->columns(2)
                        ->collapsible()
                        ->itemLabel(fn (array $state): ?string => $state['alt_text'] ?? 'Product Image'),
                ]),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                ImageColumn::make('images.image_path')
                    ->label('Thumbnail')
                    ->disk('public_dir')
                    ->limit(1)
                    ->circular(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('category.name')->label('Category'),
                TextColumn::make('base_price')->money(),
                BooleanColumn::make('is_active'),
                BooleanColumn::make('is_featured'),
                BooleanColumn::make('is_bestseller'),
                BooleanColumn::make('is_new'),
                TextColumn::make('brandSetting.brand_name')->label('Brand'),
                BadgeColumn::make('stock_quantity'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('brand_setting_id')
                    ->relationship('brandSetting', 'brand_name')
                    ->label('Brand'),
                Tables\Filters\SelectFilter::make('colors')
                    ->relationship('colors', 'name')
                    ->label('Color'),
                Tables\Filters\Filter::make('price_range')
                    ->form([
                        TextInput::make('min_price')->numeric(),
                        TextInput::make('max_price')->numeric(),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['min_price'], fn($q) => $q->where('base_price', '>=', $data['min_price']))
                            ->when($data['max_price'], fn($q) => $q->where('base_price', '<=', $data['max_price']));
                    }),
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
