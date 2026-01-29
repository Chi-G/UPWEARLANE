<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section; // Fix: Use correct namespace
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                            
                        TextInput::make('slug')
                            ->disabled()
                            ->dehydrated() 
                            ->visibleOn('edit'),
                            
                        Textarea::make('description')
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('Appearance')
                    ->schema([
                        TextInput::make('icon')
                            ->label('Icon Name (Heroicon)')
                            ->helperText('e.g. ClockIcon, TagIcon')
                            ->maxLength(255),
                            
                        FileUpload::make('image')
                            ->image()
                            ->disk('public')
                            ->directory('categories')
                            ->visibility('public'),
                            
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0),
                            
                        Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                    ])->columns(2),
            ]);
    }
}
