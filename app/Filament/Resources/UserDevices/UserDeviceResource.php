<?php

namespace App\Filament\Resources\UserDevices;

use App\Filament\Resources\UserDevices\Pages\CreateUserDevice;
use App\Filament\Resources\UserDevices\Pages\EditUserDevice;
use App\Filament\Resources\UserDevices\Pages\ListUserDevices;
use App\Filament\Resources\UserDevices\Schemas\UserDeviceForm;
use App\Filament\Resources\UserDevices\Tables\UserDevicesTable;
use App\Models\UserDevice;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class UserDeviceResource extends Resource
{
    protected static ?string $model = UserDevice::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static \UnitEnum|string|null $navigationGroup = 'User Management';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return UserDeviceForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return UserDevicesTable::configure($table);
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
            'index' => ListUserDevices::route('/'),
            'create' => CreateUserDevice::route('/create'),
            'edit' => EditUserDevice::route('/{record}/edit'),
        ];
    }
}
