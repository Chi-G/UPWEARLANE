<?php

namespace App\Filament\Resources\OrderItems\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;

class OrderItemsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('order.order_number')
                    ->label('Order #')
                    ->searchable()
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('product_name')
                    ->label('Product')
                    ->searchable()
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('product_sku')
                    ->label('SKU')
                    ->searchable(),
                \Filament\Tables\Columns\TextColumn::make('quantity')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('unit_price')
                    ->money(fn ($record) => $record->order?->currency ?? 'USD')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('total_price')
                    ->money(fn ($record) => $record->order?->currency ?? 'USD')
                    ->sortable(),
                \Filament\Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                \Filament\Tables\Filters\SelectFilter::make('order_currency')
                    ->relationship('order', 'currency')
                    ->options([
                        'NGN' => 'Naira (₦)',
                        'USD' => 'US Dollar ($)',
                        'GBP' => 'Pound (£)',
                        'CAD' => 'Canadian Dollar ($)',
                    ])
                    ->label('Currency'),
            ])
            ->actions([
                \Filament\Actions\EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
