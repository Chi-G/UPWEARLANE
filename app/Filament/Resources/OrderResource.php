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

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-shopping-cart';

    protected static \UnitEnum|string|null $navigationGroup = 'Shop Management';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            Select::make('user_id')->relationship('user', 'name')->required(),
            TextInput::make('order_number')->disabled(),
            Select::make('status')->options([
                'pending' => 'Pending',
                'processing' => 'Processing',
                'completed' => 'Completed',
                'cancelled' => 'Cancelled',
            ])->required(),
            TextInput::make('currency')->maxLength(10),
            TextInput::make('subtotal')->numeric(),
            TextInput::make('shipping_cost')->numeric(),
            TextInput::make('tax')->numeric(),
            TextInput::make('discount')->numeric(),
            TextInput::make('total')->numeric(),
            TextInput::make('shipping_method')->maxLength(100),
            TextInput::make('tracking_number')->maxLength(100),
            Textarea::make('notes'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('order_number')->searchable()->sortable(),
                TextColumn::make('user.name')->label('Customer'),
                TextColumn::make('status')->badge(),
                TextColumn::make('total')->money(),
                TextColumn::make('created_at')->dateTime(),
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
