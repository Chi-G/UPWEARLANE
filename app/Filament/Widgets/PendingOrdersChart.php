<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;

class PendingOrdersChart extends ChartWidget
{
    protected static ?int $sort = 6;

    protected ?string $heading = 'Pending vs Completed Orders';

    protected function getData(): array
    {
        $pendingCount = Order::where('status', 'pending')->count();
        $completedCount = Order::where('status', 'completed')->count();

        return [
            'datasets' => [
                [
                    'label' => 'Orders',
                    'data' => [$pendingCount, $completedCount],
                    'backgroundColor' => ['#f59e0b', '#10b981'],
                ],
            ],
            'labels' => ['Pending', 'Completed'],
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
