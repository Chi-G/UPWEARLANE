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
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid #f1f5f9;
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2rem;
            max-width: 600px;
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
            font-size: 1.125rem;
            font-weight: 700;
            margin: 0;
            color: #111827;
            line-height: 1.2;
        }

        .welcome-text p {
            font-size: 0.875rem;
            color: #6b7280;
            margin: 0;
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
            <div class="avatar-circle">
                {{ substr(auth()->user()->name, 0, 1) }}
            </div>
            <div class="welcome-text">
                <h1>Welcome</h1>
                <p>Admin</p>
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

