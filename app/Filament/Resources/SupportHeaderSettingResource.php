<?php

namespace App\Filament\Resources;

use App\Models\SupportHeaderSetting;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\TextColumn;
use App\Filament\Resources\SupportHeaderSettingResource\Pages;

class SupportHeaderSettingResource extends Resource
{
    protected static ?string $model = SupportHeaderSetting::class;

    protected static \BackedEnum|string|null $navigationIcon = 'heroicon-o-megaphone';

    protected static \UnitEnum|string|null $navigationGroup = 'Customer Support';

    public static function form(Schema $schema): Schema
    {
        return $schema->schema([
            TextInput::make('title')->required(),
            Textarea::make('subtitle'),
            Toggle::make('is_active'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('title')->searchable(),
            TextColumn::make('is_active'),
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSupportHeaderSettings::route('/'),
            'create' => Pages\CreateSupportHeaderSetting::route('/create'),
            'edit' => Pages\EditSupportHeaderSetting::route('/{record}/edit'),
        ];
    }
}
