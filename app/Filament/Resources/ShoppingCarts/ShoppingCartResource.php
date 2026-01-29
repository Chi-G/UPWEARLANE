<?php

namespace App\Filament\Resources\ShoppingCarts;

use App\Filament\Resources\ShoppingCarts\Pages\CreateShoppingCart;
use App\Filament\Resources\ShoppingCarts\Pages\EditShoppingCart;
use App\Filament\Resources\ShoppingCarts\Pages\ListShoppingCarts;
use App\Filament\Resources\ShoppingCarts\Schemas\ShoppingCartForm;
use App\Filament\Resources\ShoppingCarts\Tables\ShoppingCartsTable;
use App\Models\ShoppingCart;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ShoppingCartResource extends Resource
{
    protected static ?string $model = ShoppingCart::class;

    public static function shouldRegisterNavigation(): bool
    {
        return false;
    }

    protected static ?int $navigationSort = 1;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static \UnitEnum|string|null $navigationGroup = 'Shopping Experience';

    protected static ?string $navigationLabel = 'Cart Items';

    public static function form(Schema $schema): Schema
    {
        return ShoppingCartForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ShoppingCartsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListShoppingCarts::route('/'),
            'create' => CreateShoppingCart::route('/create'),
            'edit' => EditShoppingCart::route('/{record}/edit'),
        ];
    }
}
