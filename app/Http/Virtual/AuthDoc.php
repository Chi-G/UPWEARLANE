<?php

namespace App\Http\Virtual;

use OpenApi\Attributes as OA;

#[OA\Tag(name: "Auth", description: "Authentication and Registration endpoints")]
class AuthDoc
{
    #[OA\Post(
        path: "/api/login",
        summary: "Login with email and password",
        tags: ["Auth"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["email", "password"],
                properties: [
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "password", type: "string", format: "password"),
                    new OA\Property(property: "remember", type: "boolean")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Login successful"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function login() {}

    #[OA\Post(
        path: "/api/register",
        summary: "Register a new user",
        tags: ["Auth"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["name", "email", "password", "password_confirmation"],
                properties: [
                    new OA\Property(property: "name", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "password", type: "string", format: "password"),
                    new OA\Property(property: "password_confirmation", type: "string", format: "password")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 201, description: "User registered"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function register() {}

    #[OA\Post(
        path: "/api/logout",
        summary: "Logout the current user",
        tags: ["Auth"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(response: 204, description: "Logout successful")
        ]
    )]
    public function logout() {}

    #[OA\Post(
        path: "/api/forgot-password",
        summary: "Request a password reset link",
        tags: ["Auth"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["email"],
                properties: [
                    new OA\Property(property: "email", type: "string", format: "email")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Reset link sent"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function forgotPassword() {}

    #[OA\Post(
        path: "/api/reset-password",
        summary: "Reset the user's password",
        tags: ["Auth"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["token", "email", "password", "password_confirmation"],
                properties: [
                    new OA\Property(property: "token", type: "string"),
                    new OA\Property(property: "email", type: "string", format: "email"),
                    new OA\Property(property: "password", type: "string", format: "password"),
                    new OA\Property(property: "password_confirmation", type: "string", format: "password")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Password reset successful"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function resetPassword() {}

    #[OA\Post(
        path: "/api/email/verification-notification",
        summary: "Resend the verification email",
        tags: ["Auth"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(response: 222, description: "Verification email sent")
        ]
    )]
    public function resendVerification() {}

    #[OA\Post(
        path: "/api/user/two-factor-authentication",
        summary: "Enable two-factor authentication",
        tags: ["Auth"],
        security: [["sanctum" => []]],
        responses: [
            new OA\Response(response: 200, description: "2FA enabled"),
            new OA\Response(response: 403, description: "Password confirmation required")
        ]
    )]
    public function enable2FA() {}
}
