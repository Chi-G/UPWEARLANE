<?php

namespace App\Filament\Resources\BrandSettings;

use App\Filament\Resources\BrandSettings\Pages\CreateBrandSetting;
use App\Filament\Resources\BrandSettings\Pages\EditBrandSetting;
use App\Filament\Resources\BrandSettings\Pages\ListBrandSettings;
use App\Filament\Resources\BrandSettings\Schemas\BrandSettingForm;
use App\Filament\Resources\BrandSettings\Tables\BrandSettingsTable;
use App\Models\BrandSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BrandSettingResource extends Resource
{
    protected static ?string $model = BrandSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedSparkles;

    protected static \UnitEnum|string|null $navigationGroup = 'Frontend Settings';

    protected static ?string $navigationLabel = 'Brand Settings';

    public static function form(Schema $schema): Schema
    {
        return BrandSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BrandSettingsTable::configure($table);
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
            'index' => ListBrandSettings::route('/'),
            'create' => CreateBrandSetting::route('/create'),
            'edit' => EditBrandSetting::route('/{record}/edit'),
        ];
    }
}
