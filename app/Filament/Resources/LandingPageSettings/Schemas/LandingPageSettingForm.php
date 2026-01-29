<?php

namespace App\Filament\Resources\LandingPageSettings\Schemas;

use App\Models\Product;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class LandingPageSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Hero Section')
                    ->description('Manage the main landing page hero area')
                    ->schema([
                        TextInput::make('badge')
                            ->placeholder('e.g. New Summer Collection'),
                        TextInput::make('title')
                            ->required(),
                        Textarea::make('subtitle'),
                        FileUpload::make('background_image')
                            ->image()
                            ->disk('public')
                            ->directory('landing-page'),
                        TextInput::make('search_placeholder')
                            ->placeholder('e.g. I am looking for...'),
                        Toggle::make('is_active')
                            ->default(true),
                    ])->columns(2),

                Section::make('Featured Products Section')
                    ->schema([
                        TextInput::make('featured_title')
                            ->label('Section Title')
                            ->default('Featured Products')
                            ->required(),
                        Textarea::make('featured_description')
                            ->label('Section Description'),
                        Select::make('featured_product_ids')
                            ->label('Select Products')
                            ->multiple()
                            ->options(Product::active()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->helperText('If left empty, the system will automatically show featured products.'),
                    ])->columns(2),

                Section::make('Bestsellers Section')
                    ->schema([
                        TextInput::make('bestsellers_title')
                            ->label('Section Title')
                            ->default('Bestsellers')
                            ->required(),
                        Textarea::make('bestsellers_description')
                            ->label('Section Description'),
                        Select::make('bestseller_product_ids')
                            ->label('Select Products')
                            ->multiple()
                            ->options(Product::active()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->helperText('If left empty, the system will automatically show bestselling products.'),
                    ])->columns(2),

                Section::make('New Arrivals Section')
                    ->schema([
                        TextInput::make('new_arrivals_title')
                            ->label('Section Title')
                            ->default('New Arrivals')
                            ->required(),
                        Textarea::make('new_arrivals_description')
                            ->label('Section Description'),
                        Select::make('new_arrival_product_ids')
                            ->label('Select Products')
                            ->multiple()
                            ->options(Product::active()->pluck('name', 'id'))
                            ->searchable()
                            ->preload()
                            ->helperText('If left empty, the system will automatically show new arrival products.'),
                    ])->columns(2),
            ]);
    }
}
