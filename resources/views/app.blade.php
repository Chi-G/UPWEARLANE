<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>{{ config('app.name', 'UpWearLane') }}</title>
        
        <meta name="description" content="UpWearLane - Your premium destination for fashion and style. Explore the best forafix solutions for modern apparel. Shop now for exclusive collections.">
        <meta name="keywords" content="forafix, UpWearLane, fashion, premium apparel, luxury style, clothing, accessories">
        <meta name="author" content="UpWearLane Team">
        <meta name="robots" content="index, follow">

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="{{ config('app.name', 'UpWearLane') }} - Premium Fashion">
        <meta property="og:description" content="Discover premium fashion and forafix style solutions at UpWearLane.">
        <meta property="og:image" content="{{ url('/og-image.jpg') }}">

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="{{ url()->current() }}">
        <meta property="twitter:title" content="{{ config('app.name', 'UpWearLane') }} - Premium Fashion">
        <meta property="twitter:description" content="Discover premium fashion and forafix style solutions at UpWearLane.">
        <meta property="twitter:image" content="{{ url('/og-image.jpg') }}">

        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1.3">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=1.3">

        {{-- Mobile theme colors --}}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#020617" media="(prefers-color-scheme: dark)">

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx'])
        @inertiaHead
        @php
            // Output Ziggy routes, ensuring proper initialization for JavaScript
            if (class_exists(\Tighten\Ziggy\BladeRouteGenerator::class)) {
                 echo (new \Tighten\Ziggy\BladeRouteGenerator)->generate();
            }
        @endphp
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
