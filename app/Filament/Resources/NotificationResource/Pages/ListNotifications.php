<?php

namespace App\Filament\Resources\NotificationResource\Pages;

use App\Filament\Resources\NotificationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListNotifications extends ListRecords
{
    protected static string $resource = NotificationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('markAllAsRead')
                ->label('Mark all as read') 
                ->color('gray')
                ->icon('heroicon-o-check-circle')
                ->action(function () {
                    $user = auth('admin')->user();
                    if ($user->unreadNotifications()->count() > 0) {
                        $user->unreadNotifications->markAsRead();
                        \Filament\Notifications\Notification::make()
                            ->title('All notifications marked as read')
                            ->success()
                            ->send();
                    } else {
                        \Filament\Notifications\Notification::make()
                            ->title('No notifications at the moment')
                            ->warning()
                            ->send();
                    }
                }),
        ];
    }
}
