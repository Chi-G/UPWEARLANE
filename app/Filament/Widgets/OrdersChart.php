<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class OrdersChart extends ChartWidget
{
    protected static ?int $sort = 8;

    protected ?string $heading = 'Orders Trend';

    protected function getData(): array
    {
        $data = Order::select(DB::raw('count(*) as count'), DB::raw('DATE(created_at) as date'))
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Orders',
                    'data' => $data->pluck('count')->toArray(),
                    'fill' => 'start',
                    'borderColor' => '#3b82f6',
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                ],
            ],
            'labels' => $data->map(fn ($item) => \Carbon\Carbon::parse($item->date)->format('M d'))->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
