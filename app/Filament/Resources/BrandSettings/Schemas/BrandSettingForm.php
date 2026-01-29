<?php

namespace App\Filament\Resources\BrandSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class BrandSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Branding')
                    ->description('Manage your store name and primary visual identifiers.')
                    ->schema([
                        TextInput::make('brand_name')
                            ->required()
                            ->maxLength(255),
                        Grid::make(2)
                            ->schema([
                                FileUpload::make('app_logo')
                                    ->image()
                                    ->disk('public')
                                    ->directory('branding/logos')
                                    ->visibility('public'),
                                FileUpload::make('favicon')
                                    ->image()
                                    ->disk('public')
                                    ->directory('branding/favicons')
                                    ->visibility('public'),
                            ]),
                    ]),

                Section::make('Social Presence')
                    ->description('Add links to your official social media pages.')
                    ->schema([
                        Repeater::make('social_media')
                            ->schema([
                                Select::make('platform')
                                    ->options([
                                        'instagram' => 'Instagram',
                                        'facebook' => 'Facebook',
                                        'twitter' => 'Twitter/X',
                                        'tiktok' => 'TikTok',
                                        'youtube' => 'YouTube',
                                        'linkedin' => 'LinkedIn',
                                    ])
                                    ->required(),
                                TextInput::make('url')
                                    ->label('URL')
                                    ->url()
                                    ->required()
                                    ->placeholder('https://...'),
                            ])
                            ->columns(2)
                            ->grid(2)
                            ->itemLabel(fn (array $state): ?string => ucfirst($state['platform'] ?? 'Social Link')),
                    ]),

                Section::make('Availability')
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Activate these settings')
                            ->default(true),
                    ]),
            ]);
    }
}
