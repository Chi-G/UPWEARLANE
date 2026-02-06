<?php

namespace App\Filament\Resources\LandingPageSettings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class LandingPageSettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('background_image')
                    ->disk(fn ($record) => 
                        (str_starts_with($record->background_image, '/images') || str_starts_with($record->background_image, 'images')) 
                        ? 'public_dir' 
                        : 'public'
                    )
                    ->visibility('public'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('badge')
                    ->badge()
                    ->color('primary'),
                ToggleColumn::make('is_active'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
