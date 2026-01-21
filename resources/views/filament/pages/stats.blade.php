@extends('app')

@section('content')
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-6">Stats Overview</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded shadow p-6">
                <div class="text-gray-500">Total Users</div>
                <div class="text-2xl font-bold">{{ $totalUsers ?? 0 }}</div>
            </div>
            <div class="bg-white rounded shadow p-6">
                <div class="text-gray-500">Total Orders</div>
                <div class="text-2xl font-bold">{{ $totalOrders ?? 0 }}</div>
            </div>
            <div class="bg-white rounded shadow p-6">
                <div class="text-gray-500">Total Revenue</div>
                <div class="text-2xl font-bold">${{ number_format($totalRevenue ?? 0, 2) }}</div>
            </div>
        </div>
    </div>
@endsection
