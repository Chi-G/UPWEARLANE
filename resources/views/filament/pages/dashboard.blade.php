<x-filament-panels::page>
    <style>
        /* Fix for oversized icons */
        .fi-sidebar-item-icon, 
        .fi-sidebar-group-icon,
        .fi-topbar-item-icon,
        svg {
            max-width: 1.25rem !important;
            max-height: 1.25rem !important;
        }
        
        /* Exception for dashboard-specific decorative icons if needed */
        .chart-container svg,
        .section-container svg {
             max-width: 100% !important;
             max-height: 100% !important;
        }

        .welcome-card {
            background: oklch(0.666 0.179 58.318);
            color: white;
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid #1e40af;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;
            width: 100%;
        }

        .avatar-circle {
            width: 48px;
            height: 48px;
            background: #000;
            color: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 1.25rem;
            margin-right: 1.25rem;
        }

        .welcome-text h1 {
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0;
            color: white;
            line-height: 1.2;
        }

        .welcome-text p {
            font-size: 0.875rem;
            color: white;
            margin: 0;
            margin-top: 1rem;
        }

        .logout-btn {
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            background: white;
            font-size: 0.875rem;
            color: #374151;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.2s;
        }

        .logout-btn:hover {
            background: #f9fafb;
        }

        .fi-ta-ctn {
            margin-top: 2rem !important;
        }
    </style>

    <div class="welcome-card">
        <div class="flex items-center">
            <div class="welcome-text">
                <h1>Welcome back, {{ filament()->auth()->user()?->name ?? 'Admin' }} !</h1> 
                <p class="mt-1">{{ now()->format('l, F j, Y') }}</p>
            </div>
        </div>
        
        <form method="POST" action="{{ route('filament.admin.auth.logout') }}">
            @csrf
            <button type="submit" class="logout-btn">
                <x-heroicon-o-arrow-left-on-rectangle class="w-4 h-4" />
                <span>Sign out</span>
            </button>
        </form>
    </div>

    <div class="space-y-12">
        <div class="section-container">
            @livewire(\App\Filament\Widgets\StatsOverview::class)
        </div>



        <div class="pt-4">
            @livewire(\App\Filament\Widgets\RecentOrdersTable::class)
        </div>
    </div>
</x-filament-panels::page>
