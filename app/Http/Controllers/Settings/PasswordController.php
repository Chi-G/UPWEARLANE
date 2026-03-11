<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;
use OpenApi\Attributes as OA;

class PasswordController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/settings/password",
     *     summary="Show password settings data",
     *     tags={"Profile"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Success")
     * )
     */
    public function edit(): Response
    {
        return Inertia::render('settings/password');
    }

    /**
     * @OA\Put(
     *     path="/api/settings/password",
     *     summary="Update the user's password",
     *     tags={"Profile"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(response=200, description="Password updated"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => $validated['password'],
        ]);

        return back();
    }
}
