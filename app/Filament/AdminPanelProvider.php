<?php

namespace App\Filament;

use Filament\Panel;
use Filament\PanelProvider;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel 
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->authGuard('admin')
            ->middleware([
                'web',
            ])
            ->profile()
            ->discoverResources(
                in: app_path('Filament/Resources'),
                for: 'App\Filament\Resources'
            )
            ->discoverPages( 
                in: app_path('Filament/Pages'),
                for: 'App\Filament\Pages'
            )
            ->discoverWidgets(
                in: app_path('Filament/Widgets'),
                for: 'App\Filament\Widgets'
            )
            ->navigationGroups([
                'Shop Management',
                'Customer Support',
                'User Management',
            ]);
    }
}
