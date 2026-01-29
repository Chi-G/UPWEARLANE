<?php

namespace App\Filament\Resources\PriceRange\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PriceRangeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->schema([
                Section::make('Price Range Configuration')
                    ->description('Define the price range values in base NGN. The frontend will automatically generate formatted labels in the user\'s selected currency.')
                    ->columnSpan(2)
                    ->schema([
                        TextInput::make('label')
                            ->maxLength(255)
                            ->placeholder('e.g. Budget Friendly (Optional)')
                            ->helperText('If left empty, a label will be generated automatically based on the prices.')
                            ->columnSpanFull()
                            ->suffixIcon('heroicon-m-tag'),
                        
                        Grid::make(2)
                            ->schema([
                                TextInput::make('min_price')
                                    ->numeric()
                                    ->required()
                                    ->default(0)
                                    ->label('Minimum Price (NGN)')
                                    ->prefix('₦')
                                    ->helperText('Value in base currency (Naira)'),
                                
                                TextInput::make('max_price')
                                    ->numeric()
                                    ->label('Maximum Price (NGN)')
                                    ->prefix('₦')
                                    ->placeholder('Open-ended')
                                    ->helperText('Leave empty for "Above X"'),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0)
                                    ->required()
                                    ->label('Display Priority')
                                    ->helperText('Lower values appear first')
                                    ->prefixIcon('heroicon-m-bars-arrow-down'),
                                
                                Toggle::make('is_active')
                                    ->label('Enable this range')
                                    ->default(true)
                                    ->inline(false),
                            ]),
                    ]),

                Section::make('Live Preview')  
                    ->description('How this looks on the site.')
                    ->columnSpan(1)
                    ->schema([
                        \Filament\Forms\Components\Placeholder::make('conversion_preview')
                            ->label('Converted View')
                            ->content(function ($get) {
                                $min = (float) $get('min_price') ?: 0;
                                $max = (float) $get('max_price') ?: null;
                                
                                $rates = \App\Models\CurrencyRate::getConversionRates();
                                if (empty($rates)) {
                                    $rates = ['NGN' => 1500, 'USD' => 1, 'GBP' => 0.79, 'CAD' => 1.36];
                                }
                                
                                $currencies = \App\Models\CurrencyRate::where('is_active', true)->get();
                                
                                $format = function($val, $currencyCode, $symbol) use ($rates) {
                                    if ($val === null) return 'Any';
                                    $rate = $rates[$currencyCode] ?? 1;
                                    $converted = ($val / ($rates['NGN'] ?? 1500)) * $rate;
                                    return $symbol . number_format($converted, 2);
                                };

                                $output = "";
                                if ($currencies->isEmpty()) {
                                    $output .= "*No active currencies.*";
                                } else {
                                    foreach ($currencies as $curr) {
                                        $minF = $format($min, $curr->code, $curr->symbol);
                                        $maxF = $format($max, $curr->code, $curr->symbol);
                                        $label = $max ? "{$minF} — {$maxF}" : "Above {$minF}";
                                        $output .= "**{$curr->code}**: {$label}\n\n";
                                    }
                                }

                                return new \Illuminate\Support\HtmlString(nl2br(e($output)));
                            }),
                    ]),
            ]);
    }
}
