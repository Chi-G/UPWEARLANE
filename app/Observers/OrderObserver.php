<?php

namespace App\Observers;

use App\Models\Order;
use App\Models\User;
use Filament\Notifications\Notification;
use Filament\Actions\Action;

class OrderObserver
{
    /**
     * Handle the Order "created" event.
     */
    public function created(Order $order): void 
    {
        $admins = User::getAdmins();
        $customerName = $order->user?->name ?? 'Guest';

        foreach ($admins as $admin) {
            Notification::make()
                ->title('New Order Received')
                ->icon('heroicon-o-shopping-cart')
                ->body("Order **#{$order->order_number}** placed by **{$customerName}** for **{$order->currency} " . number_format($order->total, 2) . "**.")
                ->actions([
                    Action::make('view')
                        ->label('View Order')
                        ->url(fn () => \App\Filament\Resources\OrderResource::getUrl('edit', ['record' => $order])),
                ])
                ->sendToDatabase($admin);
        }
    }

    /**
     * Handle the Order "updated" event.
     */
    public function updated(Order $order): void
    {
        if ($order->isDirty('status')) {
            $admins = User::getAdmins();
            $oldStatus = $order->getOriginal('status');
            $newStatus = $order->status;

            foreach ($admins as $admin) {
                Notification::make()
                    ->title('Order Status Updated')
                    ->icon('heroicon-o-arrow-path')
                    ->body("Order **#{$order->order_number}** status changed from **" . ucfirst($oldStatus) . "** to **" . ucfirst($newStatus) . "**.")
                    ->actions([
                        Action::make('view')
                            ->label('View Order')
                            ->url(fn () => \App\Filament\Resources\OrderResource::getUrl('edit', ['record' => $order])),
                    ])
                    ->sendToDatabase($admin);
            }
        }
    }
}
