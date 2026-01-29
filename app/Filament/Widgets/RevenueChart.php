<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RevenueChart extends ChartWidget
{
    protected static ?int $sort = 2;

    protected ?string $heading = 'Revenue per Month';
    
    protected int | string | array $columnSpan = 'full';

    protected function getData(): array
    {
        $data = Order::select(
                DB::raw('sum(total) as revenue'), 
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
                    'label' => 'Revenue',
                    'data' => $data->pluck('revenue')->toArray(),
                    'backgroundColor' => '#10b981',
                    'borderColor' => '#059669',
                ],
            ],
            'labels' => $data->map(function ($row) {
                return Carbon::parse($row->month_year . '-01')->format('M Y');
            })->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
