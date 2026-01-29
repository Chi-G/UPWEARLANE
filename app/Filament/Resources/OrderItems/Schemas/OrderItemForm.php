<?php

namespace App\Filament\Resources\OrderItems\Schemas;

use Filament\Schemas\Schema;

class OrderItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Item Details')
                    ->schema([
                        \Filament\Forms\Components\Select::make('order_id')
                            ->relationship('order', 'order_number')
                            ->required()
                            ->searchable()
                            ->label('Order'),
                        \Filament\Schemas\Components\Grid::make(12)->schema([
                            \Filament\Forms\Components\Select::make('product_id')
                                ->relationship('product', 'name')
                                ->searchable()
                                ->required()
                                ->label('Product')
                                ->reactive()
                                ->columnSpan(12)
                                ->afterStateUpdated(function ($state, callable $set) {
                                    $product = \App\Models\Product::find($state);
                                    if ($product) {
                                        $set('unit_price', $product->base_price);
                                        $set('product_name', $product->name);
                                        $set('product_sku', $product->sku);
                                    }
                                }),
                            \Filament\Forms\Components\TextInput::make('product_name')
                                ->required()
                                ->columnSpan(6),
                            \Filament\Forms\Components\TextInput::make('product_sku')
                                ->label('SKU')
                                ->columnSpan(6),
                        ]),
                        \Filament\Schemas\Components\Grid::make(12)->schema([
                            \Filament\Forms\Components\TextInput::make('quantity')
                                ->numeric()
                                ->default(1)
                                ->required()
                                ->reactive()
                                ->columnSpan(4)
                                ->afterStateUpdated(fn ($state, callable $get, callable $set) => $set('total_price', $state * $get('unit_price'))),
                            \Filament\Forms\Components\TextInput::make('unit_price')
                                ->numeric()
                                ->required()
                                ->reactive()
                                ->columnSpan(4)
                                ->afterStateUpdated(fn ($state, callable $get, callable $set) => $set('total_price', $state * $get('quantity'))),
                            \Filament\Forms\Components\TextInput::make('total_price')
                                ->numeric()
                                ->required()
                                ->columnSpan(4),
                        ]),
                    ]),
            ]);
    }
}
