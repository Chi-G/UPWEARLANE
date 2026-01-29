<?php

namespace App\Filament\Resources\Addresses\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;
 
class AddressForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('User Association')
                    ->description('Link this address to a specific user account.')
                    ->schema([
                        Select::make('user_id')
                            ->relationship('user', 'name')
                            ->required()
                            ->searchable()
                            ->preload(),
                    ]),

                Section::make('Contact Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('full_name')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('company')
                                    ->maxLength(255),
                                TextInput::make('email')
                                    ->email()
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('phone')
                                    ->tel()
                                    ->required()
                                    ->maxLength(20),
                            ]),
                    ]),

                Section::make('Location Details')
                    ->schema([
                        Select::make('type')
                            ->options([
                                'shipping' => 'Shipping',
                                'billing' => 'Billing',
                            ])
                            ->required(),
                        TextInput::make('address_line_1')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('address_line_2')
                            ->maxLength(255),
                        Grid::make(3)
                            ->schema([
                                TextInput::make('city')
                                    ->required()
                                    ->maxLength(100),
                                TextInput::make('state')
                                    ->required()
                                    ->maxLength(100),
                                TextInput::make('postal_code')
                                    ->required()
                                    ->maxLength(20),
                            ]),
                        TextInput::make('country')
                            ->required()
                            ->maxLength(100)
                            ->default('Nigeria'),
                    ]),

                Section::make('Status')
                    ->schema([
                        Toggle::make('is_default')
                            ->label('Set as Default Address')
                            ->default(false),
                    ]),
            ]);
    }
}
