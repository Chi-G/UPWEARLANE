<?php

namespace App\Filament\Resources\FooterSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class FooterSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Company Info')
                    ->description('General company description and social media links.')
                    ->schema([
                        Textarea::make('company_description')
                            ->required()
                            ->rows(3)
                            ->columnSpanFull(),
                        Repeater::make('social_links')
                            ->schema([
                                TextInput::make('name')->required()->placeholder('e.g. Facebook'),
                                TextInput::make('url')->url()->required(),
                                TextInput::make('icon')->required()->placeholder('e.g. facebook'),
                            ])
                            ->columns(3)
                            ->itemLabel(fn (array $state): ?string => $state['name'] ?? 'Social Link'),
                    ]),

                Section::make('Navigation Links')
                    ->description('Manage categories and quick links in the footer.')
                    ->schema([
                        Grid::make(2)->schema([
                            Repeater::make('quick_links')
                                ->schema([
                                    TextInput::make('name')->required(),
                                    TextInput::make('url')->required(),
                                ])
                                ->itemLabel(fn (array $state): ?string => $state['name'] ?? 'Link'),
                            Repeater::make('categories')
                                ->schema([
                                    TextInput::make('name')->required(),
                                    TextInput::make('url')->required(),
                                ])
                                ->itemLabel(fn (array $state): ?string => $state['name'] ?? 'Category'),
                        ]),
                    ]),

                Section::make('Contact Information')
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('contact_address')->required(),
                            TextInput::make('contact_phone')->required(),
                            TextInput::make('contact_email')->email()->required(),
                        ]),
                    ]),

                Section::make('Trust & Legal')
                    ->schema([
                        Grid::make(2)->schema([
                            Repeater::make('trust_badges')
                                ->schema([
                                    TextInput::make('name')->required()->label('Badge Label'),
                                ])
                                ->itemLabel(fn (array $state): ?string => $state['name'] ?? 'Badge'),
                            Repeater::make('legal_links')
                                ->schema([
                                    TextInput::make('name')->required(),
                                    TextInput::make('url')->required(),
                                ])
                                ->itemLabel(fn (array $state): ?string => $state['name'] ?? 'Legal Link'),
                        ]),
                        Toggle::make('is_active')
                            ->label('Active on Frontend')
                            ->default(true),
                    ]),
            ]);
    }
}
