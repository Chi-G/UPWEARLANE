<?php

namespace App\Filament\Resources;

use App\Models\CartSetting;
use Filament\Forms;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BooleanColumn;
use App\Filament\Resources\CartSettingResource\Pages;

class CartSettingResource extends Resource
{
    protected static ?string $model = CartSetting::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-cog';

    protected static \UnitEnum|string|null $navigationGroup = 'Shop Management';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('name')->required(),
            Textarea::make('value'),
            Toggle::make('is_active'),
        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('name')->searchable(),
            BooleanColumn::make('is_active'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCartSettings::route('/'),
            'create' => Pages\CreateCartSetting::route('/create'),
            'edit' => Pages\EditCartSetting::route('/{record}/edit'),
        ];
    }
}
