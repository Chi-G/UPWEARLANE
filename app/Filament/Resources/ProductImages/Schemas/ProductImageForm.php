<?php

namespace App\Filament\Resources\ProductImages\Schemas;

use App\Models\Product;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductImageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('product_id')
                    ->relationship('product', 'name')
                    ->required()
                    ->searchable()
                    ->placeholder('Select a product'),
                FileUpload::make('image_path')
                    ->image()
                    ->required()
                    ->directory('products')
                    ->disk('public_dir')
                    ->imageEditor()
                    ->label('Product Image'),
                TextInput::make('alt_text')
                    ->maxLength(255)
                    ->placeholder('Alt text for SEO'),
                Toggle::make('is_primary')
                    ->label('Is Primary Image')
                    ->default(false),
                TextInput::make('sort_order')
                    ->numeric()
                    ->default(0),
            ]);
    }
}
