<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Event;
use App\Listeners\AdminLoginListener;
use App\Models\User;
use App\Models\Order;
use App\Observers\UserObserver;
use App\Observers\OrderObserver;

class AppServiceProvider extends ServiceProvider 
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // 
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->greeting('Hello ' . $notifiable->name . '!')
                ->line('Please click the button below to verify your email address.')
                ->action('Verify Email Address', $url)
                ->line('If you did not create an account, no further action is required.');
        });

        Model::preventLazyLoading(! app()->isProduction());

        Event::listen(
            Login::class,
            AdminLoginListener::class,
        );

        User::observe(UserObserver::class);
        Order::observe(OrderObserver::class);
    }
}
