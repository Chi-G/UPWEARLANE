<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Widgets\ChartWidget;

class ProductStatusChart extends ChartWidget
{
    protected static ?int $sort = 5;

    protected ?string $heading = 'Product Status Distribution';

    protected function getData(): array
    {
        $activeCount = Product::where('is_active', true)->count();
        $outOfStockCount = Product::where('stock_quantity', '<=', 0)->count();

        return [
            'datasets' => [
                [
                    'label' => 'Product Status',
                    'data' => [$activeCount, $outOfStockCount],
                    'backgroundColor' => ['#10b981', '#ef4444'],
                ],
            ],
            'labels' => ['Active', 'Out of Stock'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }
}
