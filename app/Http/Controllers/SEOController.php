<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Response;
use OpenApi\Attributes as OA;

class SEOController extends Controller
{
    #[OA\Get(
        path: "/sitemap.xml",
        summary: "Generate sitemap.xml",
        tags: ["SEO"],
        responses: [
            new OA\Response(response: 200, description: "XML Sitemap returned")
        ]
    )]
    public function sitemap()
    {
        $products = Product::where('is_active', true)->get();
        
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
        
        // Static Pages
        $staticPages = [
            '/',
            '/product-catalog',
            '/shopping-cart',
            '/support',
            '/checkout-flow',
        ];
        
        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>' . url($page) . '</loc>';
            $xml .= '<changefreq>daily</changefreq>';
            $xml .= '<priority>1.0</priority>';
            $xml .= '</url>';
        }
        
        // Dynamic Product Pages
        foreach ($products as $product) {
            $xml .= '<url>';
            $xml .= '<loc>' . url('/product-detail/' . $product->id) . '</loc>';
            $xml .= '<lastmod>' . $product->updated_at->toAtomString() . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }
        
        $xml .= '</urlset>';
        
        return response($xml, 200)->header('Content-Type', 'text/xml');
    }
}
