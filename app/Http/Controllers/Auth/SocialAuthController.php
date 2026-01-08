<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController extends Controller
{
    /**
     * Redirect to Google OAuth
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle Google OAuth callback
     */
    public function handleGoogleCallback()
    {
        try {
            \Illuminate\Support\Facades\Log::info('Google Callback Hit');

            $googleUser = Socialite::driver('google')->user();

            \Illuminate\Support\Facades\Log::info('Google User Retrieved', ['email' => $googleUser->getEmail()]);

            $user = User::where('email', $googleUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'email_verified_at' => null,
                    'password' => Hash::make(Str::random(24)),
                ]);

                try {
                    $user->sendEmailVerificationNotification();
                } catch (\Exception $e) {
                    \Illuminate\Support\Facades\Log::error('Failed to send verification email during Google login: ' . $e->getMessage());
                }

            } else {
                if (!$user->google_id) {
                    $user->update([
                        'google_id' => $googleUser->getId(),
                        'avatar' => $googleUser->getAvatar(),
                    ]);
                }
            }

            Auth::login($user, true);

            return redirect()->intended('/');

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Google Login Error: ' . $e->getMessage());
            return redirect('/')->with('error', 'Unable to login with Google. Please try again.');
        }
    }
}
