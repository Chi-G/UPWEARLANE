<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class LowStockChart extends ChartWidget
{
    protected static ?int $sort = 7;

    protected ?string $heading = 'Low Stock Items by Category';

    protected function getData(): array
    {
        $data = Product::with('category')
            ->where('stock_quantity', '<', 10)
            ->get()
            ->groupBy('category.name')
            ->map(fn ($group) => $group->count())
            ->sortDesc()
            ->take(5);

        return [
            'datasets' => [
                [
                    'label' => 'Low Stock Items',
                    'data' => $data->values()->toArray(),
                    'backgroundColor' => '#ef4444',
                ],
            ],
            'labels' => $data->keys()->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
    
    protected function getOptions(): array
    {
        return [
            'indexAxis' => 'y',
        ];
    }
}
