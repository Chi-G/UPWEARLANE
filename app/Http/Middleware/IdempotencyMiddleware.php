<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class IdempotencyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only apply to POST and PUT requests
        if (!$request->isMethod('POST') && !$request->isMethod('PUT')) {
            return $next($request);
        }

        $idempotencyKey = $request->header('X-Idempotency-Key');

        if (!$idempotencyKey) {
            return $next($request);
        }

        $cacheKey = "idempotency:{$idempotencyKey}";

        // If we have a cached response for this key, return it
        if (Cache::has($cacheKey)) {
            $cachedData = Cache::get($cacheKey);
            return response()->json($cachedData['content'], $cachedData['status'], $cachedData['headers']);
        }

        // Proceed with the request
        $response = $next($request);

        // Only cache successful or client-error responses (not server errors)
        if ($response->getStatusCode() < 500) {
            $data = [
                'content' => json_decode($response->getContent(), true),
                'status' => $response->getStatusCode(),
                'headers' => array_intersect_key($response->headers->all(), array_flip(['Content-Type'])),
            ];

            // Cache for 24 hours
            Cache::put($cacheKey, $data, now()->addDay());
        }

        return $response;
    }
}
