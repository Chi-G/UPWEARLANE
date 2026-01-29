<?php

namespace App\Observers;

use App\Models\User;
use Filament\Notifications\Notification;
use Filament\Actions\Action;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $admins = User::getAdmins();

        foreach ($admins as $admin) {
            Notification::make()
                ->title('New User Registered')
                ->icon('heroicon-o-user-plus')
                ->body("**{$user->name}** ({$user->email}) has just created an account.")
                ->actions([
                    Action::make('view')
                        ->label('View User')
                        ->url(fn () => \App\Filament\Resources\UserResource::getUrl('edit', ['record' => $user])),
                ])
                ->sendToDatabase($admin);
        }
    }
}
