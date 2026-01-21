<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Product;
use App\Models\PromoCode;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->description('Registered customers')
                ->descriptionIcon('heroicon-m-users')
                ->color('info'),
            Stat::make('Total Orders', Order::count())
                ->description('All time orders')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('primary'),
            Stat::make('Total Revenue', '$' . number_format(Order::where('status', 'completed')->sum('total'), 2))
                ->description('Total paid orders')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('success'),
            Stat::make('Active Products', Product::where('is_active', true)->count())
                ->description('Products available for sale')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('success'),
            Stat::make('Categories', \App\Models\Category::count())
                ->description('Product categories')
                ->descriptionIcon('heroicon-m-tag')
                ->color('warning'),
            Stat::make('Pending Orders', Order::where('status', 'pending')->count())
                ->description('Orders awaiting processing')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger'),
        ]; 
    }
}
