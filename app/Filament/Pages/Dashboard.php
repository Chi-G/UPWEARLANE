<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class Dashboard extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-home';
    // protected static string|\UnitEnum|null $navigationGroup = 'Shop Management';
    protected static ?string $slug = 'dashboard';
    protected static ?int $navigationSort = 1;
    protected static ?string $navigationLabel = 'Dashboard';
    protected string $view = 'filament.pages.dashboard';

    public function getHeading(): string
    {
        return '';
    }
}
