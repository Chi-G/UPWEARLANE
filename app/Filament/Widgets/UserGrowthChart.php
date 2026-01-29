<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserGrowthChart extends ChartWidget
{
    protected static ?int $sort = 4;

    protected ?string $heading = 'New Users Growth';

    protected function getData(): array
    {
        $data = User::select(
                DB::raw('count(*) as count'), 
                DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month_year")
            )
            ->whereYear('created_at', date('Y'))
            ->groupBy('month_year')
            ->orderBy('month_year')
            ->get();

        return [
            'datasets' => [
                [
                    'label' => 'New Users',
                    'data' => $data->pluck('count')->toArray(),
                    'backgroundColor' => '#f59e0b', 
                    'borderColor' => '#d97706',     
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
