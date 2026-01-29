<?php

namespace App\Filament\Resources\UserDevices\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Table;

class UserDevicesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')->label('User')->sortable()->searchable(),
                TextColumn::make('device_name')->label('Device Name')->sortable()->searchable(),
                TextColumn::make('browser')->label('Browser')->sortable()->searchable(),
                TextColumn::make('platform')->label('Platform')->sortable(),
                TextColumn::make('ip_address')->label('IP Address')->sortable()->searchable(),
                TextColumn::make('user_agent')->label('User Agent')->limit(30),
                IconColumn::make('is_current')->label('Is Current')->boolean(),
                TextColumn::make('last_used_at')->label('Last Used At')->dateTime()->sortable(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
