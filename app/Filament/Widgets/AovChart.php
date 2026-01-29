<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AovChart extends ChartWidget
{
    protected static ?int $sort = 3;

    protected ?string $heading = 'Average Order Value Trend';

    protected function getData(): array
    {
        $data = Order::select(
                DB::raw('avg(total) as avg_value'), 
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month_year")
            )
            ->where('status', 'completed')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month_year')
            ->orderBy('month_year')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'Average Order Value',
                    'data' => $data->pluck('avg_value')->toArray(),
                    'fill' => true,
                    'borderColor' => '#3b82f6', // Blue 500
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                ],
            ],
            'labels' => $data->map(function ($row) {
                return Carbon::parse($row->month_year . '-01')->format('M Y');
            })->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
