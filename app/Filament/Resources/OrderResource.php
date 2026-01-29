<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;

use App\Models\Order;
use Filament\Forms;
use Filament\Schemas\Schema;
// ...existing code...
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use Filament\Tables\Columns\BadgeColumn;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?int $navigationSort = 5;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-shopping-cart';

    protected static \UnitEnum|string|null $navigationGroup = 'Order Management';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            \Filament\Schemas\Components\Section::make('Order Details')
                ->schema([
                    Select::make('user_id')
                        ->relationship('user', 'name')
                        ->required()
                        ->searchable()
                        ->label('Customer'),
                    TextInput::make('order_number')
                        ->disabled()
                        ->dehydrated(false), // Don't save if disabled and not generated here, though typically it's auto-generated
                    Select::make('status')->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                        'refunded' => 'Refunded',
                    ])->required(),
                    Select::make('currency')
                        ->options([
                            'NGN' => 'Naira (₦)',
                            'USD' => 'US Dollar ($)',
                            'GBP' => 'Pound (£)',
                            'CAD' => 'Canadian Dollar ($)',
                        ])
                        ->default('NGN')
                        ->required(),
                    Select::make('shipping_method')
                         ->options([
                             'standard' => 'Standard Shipping',
                             'express' => 'Express Shipping',
                         ]),
                    TextInput::make('tracking_number'),
                ])->columns(2),

            \Filament\Schemas\Components\Section::make('Order Items')
                ->schema([
                    \Filament\Forms\Components\Repeater::make('items')
                        ->relationship('items')
                        ->schema([
                            \Filament\Schemas\Components\Grid::make(12)->schema([
                                Select::make('product_id')
                                    ->relationship('product', 'name')
                                    ->searchable()
                                    ->required()
                                    ->label('Product')
                                    ->reactive()
                                    ->columnSpan(12) // Full width
                                    ->afterStateUpdated(function ($state, callable $set) {
                                        $product = \App\Models\Product::find($state);
                                        if ($product) {
                                            $set('unit_price', $product->base_price);
                                            $set('product_name', $product->name);
                                            $set('product_sku', $product->sku);
                                        }
                                    }),
                                TextInput::make('product_name')->required()->columnSpan(6), // Half width
                                TextInput::make('product_sku')->label('SKU')->columnSpan(6),
                            ]),
                            \Filament\Schemas\Components\Grid::make(12)->schema([
                                TextInput::make('quantity')
                                    ->numeric()
                                    ->default(1)
                                    ->required()
                                    ->reactive()
                                    ->columnSpan(4)
                                    ->afterStateUpdated(fn ($state, callable $get, callable $set) => $set('total_price', $state * $get('unit_price'))),
                                TextInput::make('unit_price')
                                    ->numeric()
                                    ->required()
                                    ->reactive()
                                    ->columnSpan(4)
                                    ->afterStateUpdated(fn ($state, callable $get, callable $set) => $set('total_price', $state * $get('quantity'))),
                                TextInput::make('total_price')
                                    ->numeric()
                                    ->required()
                                    ->dehydrated()
                                    ->columnSpan(4), // Editable now
                            ]),
                        ])
                        ->columns(1) // Repeater itself is 1 column, internal Grid handles layout
                        ->itemLabel(fn (array $state): ?string => $state['product_name'] ?? null),
                ]),

            \Filament\Schemas\Components\Section::make('Financials')
                ->schema([
                    TextInput::make('subtotal')->numeric(),
                    TextInput::make('shipping_cost')->numeric(),
                    TextInput::make('tax')->numeric(),
                    TextInput::make('discount')->numeric(),
                    TextInput::make('total')->numeric()->required(),
                    Textarea::make('notes')->columnSpanFull(),
                ])->columns(2),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('order_number')->searchable()->sortable(),
                TextColumn::make('user.name')->label('Customer')->searchable()->sortable(),
                TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'gray',
                        'processing' => 'warning',
                        'shipped' => 'primary',
                        'delivered' => 'success',
                        'cancelled', 'refunded' => 'danger',
                        default => 'primary',
                    }),
                TextColumn::make('items_count')->counts('items')->label('Items'),
                TextColumn::make('total')->money(fn ($record) => $record->currency),
                TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                        'refunded' => 'Refunded',
                    ]),
                Tables\Filters\SelectFilter::make('currency')
                    ->options([
                        'NGN' => 'Naira (₦)',
                        'USD' => 'US Dollar ($)',
                        'GBP' => 'Pound (£)',
                        'CAD' => 'Canadian Dollar ($)',
                    ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
