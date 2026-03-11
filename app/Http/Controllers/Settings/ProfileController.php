<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use OpenApi\Attributes as OA;

class ProfileController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/profile",
     *     summary="Show the user's profile settings data",
     *     tags={"Profile"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Profile data returned")
     * )
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * @OA\Patch(
     *     path="/api/profile",
     *     summary="Update the user's profile settings",
     *     tags={"Profile"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Profile updated"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * @OA\Delete(
     *     path="/api/profile",
     *     summary="Delete the user's account",
     *     tags={"Profile"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Account deleted"),
     *     @OA\Response(response=422, description="Password verification failed")
     * )
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
