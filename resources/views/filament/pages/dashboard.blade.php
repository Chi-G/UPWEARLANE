<x-filament-panels::page>
    <div class="filament-page-heading flex items-center justify-between mb-6">
        <div>
            <h1 class="filament-heading text-2xl font-bold">Welcome</h1>
            <div class="text-lg font-semibold text-gray-700">Admin</div>
        </div>
        <form method="POST" action="{{ route('filament.admin.auth.logout') }}">
            @csrf
            <button type="submit" class="text-danger-600 hover:text-danger-500 font-bold">Sign out</button>
        </form>
    </div>

    @widgets([
        App\Filament\Widgets\StatsOverview::class,
        App\Filament\Widgets\RecentOrdersTable::class,
    ])
</x-filament-panels::page>

