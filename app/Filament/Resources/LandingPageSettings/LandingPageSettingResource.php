<?php

namespace App\Filament\Resources\LandingPageSettings;

use App\Filament\Resources\LandingPageSettings\Pages\CreateLandingPageSetting;
use App\Filament\Resources\LandingPageSettings\Pages\EditLandingPageSetting;
use App\Filament\Resources\LandingPageSettings\Pages\ListLandingPageSettings;
use App\Filament\Resources\LandingPageSettings\Schemas\LandingPageSettingForm;
use App\Filament\Resources\LandingPageSettings\Tables\LandingPageSettingsTable;
use App\Models\HeroSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class LandingPageSettingResource extends Resource
{
    protected static ?string $model = HeroSetting::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-presentation-chart-bar';

    protected static \UnitEnum|string|null $navigationGroup = 'Frontend Settings';

    protected static ?string $navigationLabel = 'Landing Page Settings';
    
    protected static ?string $modelLabel = 'Landing Page Setting';

    public static function form(Schema $schema): Schema
    {
        return LandingPageSettingForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LandingPageSettingsTable::configure($table);
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
            'index' => ListLandingPageSettings::route('/'),
            'create' => CreateLandingPageSetting::route('/create'),
            'edit' => EditLandingPageSetting::route('/{record}/edit'),
        ];
    }
}
