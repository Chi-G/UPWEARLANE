<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\DB;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $avgOrderValue = Order::where('status', 'completed')->avg('total') ?? 0;
        $lowStockCount = Product::where('stock_quantity', '<', 5)->count();

        // Total User Growth sparkline (last 30 days)
        $userGrowth = User::select(DB::raw('count(*) as count'), DB::raw('DATE(created_at) as date'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->pluck('count')
            ->toArray();

        // Revenue trend sparkline (last 30 days)
        $revenueTrend = Order::select(DB::raw('sum(total) as total'), DB::raw('DATE(created_at) as date'))
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->pluck('total')
            ->toArray();

        // AOV trend sparkline (last 30 days) - calculated manually to match days
        $aovTrendData = Order::select(DB::raw('avg(total) as avg'), DB::raw('DATE(created_at) as date'))
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->pluck('avg')
            ->toArray();

        return [
            Stat::make('Total Revenue', '$'.number_format(Order::where('status', 'completed')->sum('total'), 2))
                ->description('Total paid orders (Last 30 days trend)')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->chart($revenueTrend)
                ->color('success'),
            Stat::make('Average Order Value', '$'.number_format($avgOrderValue, 2))
                ->description('Average per completed order (Last 30 days trend)')
                ->descriptionIcon('heroicon-m-presentation-chart-line')
                ->chart($aovTrendData)
                ->color('info'),
            Stat::make('Pending Orders', Order::where('status', 'pending')->count())
                ->description('Orders awaiting processing')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning'),
            Stat::make('Total Users', User::count())
                ->description('User growth (Last 30 days)')
                ->descriptionIcon('heroicon-m-users')
                ->chart($userGrowth)
                ->color('primary'),
            Stat::make('Active Products', Product::where('is_active', true)->count())
                ->description('Products available for sale')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('success'),
            Stat::make('Low Stock Products', $lowStockCount)
                ->description('Products with less than 5 items')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color($lowStockCount > 0 ? 'danger' : 'success'),
        ];
    }
}
