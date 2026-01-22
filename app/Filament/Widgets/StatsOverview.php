<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $avgOrderValue = Order::where('status', 'completed')->avg('total') ?? 0;
        $lowStockCount = Product::where('stock_quantity', '<', 5)->count();

        return [
            Stat::make('Total Revenue', '$'.number_format(Order::where('status', 'completed')->sum('total'), 2))
                ->description('Total paid orders')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->chart([7, 3, 4, 5, 6, 3, 5, 3])
                ->color('success'),
            Stat::make('Average Order Value', '$'.number_format($avgOrderValue, 2))
                ->description('Average per completed order')
                ->descriptionIcon('heroicon-m-presentation-chart-line')
                ->color('info'),
            Stat::make('Pending Orders', Order::where('status', 'pending')->count())
                ->description('Orders awaiting processing')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger'),
            Stat::make('Total Users', User::count())
                ->description('Registered customers')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),
            Stat::make('Active Products', Product::where('is_active', true)->count())
                ->description('Products available for sale')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('success'),
            Stat::make('Low Stock Products', $lowStockCount)
                ->description('Products with less than 5 items')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color($lowStockCount > 0 ? 'warning' : 'success'),
        ];
    }
}
