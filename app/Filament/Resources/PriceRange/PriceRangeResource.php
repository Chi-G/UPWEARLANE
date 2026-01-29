<?php

namespace App\Filament\Resources\PriceRange;

use App\Filament\Resources\PriceRange\Pages\CreatePriceRange;
use App\Filament\Resources\PriceRange\Pages\EditPriceRange;
use App\Filament\Resources\PriceRange\Pages\ListPriceRanges;
use App\Filament\Resources\PriceRange\Schemas\PriceRangeForm;
use App\Filament\Resources\PriceRange\Tables\PriceRangeTable;
use App\Models\PriceRange;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PriceRangeResource extends Resource
{
    protected static ?string $model = PriceRange::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBanknotes;

    protected static \UnitEnum|string|null $navigationGroup = 'Frontend Settings';

    protected static ?string $navigationLabel = 'Price Range Settings';

    public static function form(Schema $schema): Schema
    {
        return PriceRangeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PriceRangeTable::configure($table);
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
            'index' => ListPriceRanges::route('/'),
            'create' => CreatePriceRange::route('/create'),
            'edit' => EditPriceRange::route('/{record}/edit'),
        ];
    }
}
