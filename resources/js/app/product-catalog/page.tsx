import Header from '@/components/common/Header';
import { Product } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import ProductCatalogInteractive from './components/ProductCatalogInteractive';

export const metadata = {
    title: 'Product Catalog - UpWearLane',
    description:
        'Browse our collection of high-tech fashion, smart fabrics, and wearable technology accessories with advanced filtering and sorting options.',
};

interface ProductFromDB {
    id: number;
    name: string;
    slug: string;
    description: string;
    base_price: string;
    currency: string | null;
    original_price: string | null;
    rating: number;
    review_count: number;
    is_new: boolean;
    is_featured: boolean;
    is_bestseller: boolean;
    category: { id: number; name: string; slug: string } | null;
    primary_image: { id: number; image_path: string; alt_text: string } | null;
    colors: Array<{ id: number; name: string; hex_code: string }>;
}

interface PageProps {
    products: {
        data: ProductFromDB[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    [key: string]: unknown;
}

export default function ProductCatalogPage() {
    const { products: paginatedProducts } = usePage<PageProps>().props;

    // Ensure currency parameter is in URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('currency')) {
            const savedCurrency = localStorage.getItem('selected_currency') || 'NGN';
            urlParams.set('currency', savedCurrency);
            router.visit(`${window.location.pathname}?${urlParams.toString()}`, {
                preserveState: false,
                preserveScroll: true,
                replace: true,
            });
        }
    }, []);

    // Transform database products to frontend format
    const products: Product[] = paginatedProducts?.data?.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category?.name || 'Uncategorized',
        price: parseFloat(p.base_price),
        originalPrice: p.original_price ? parseFloat(p.original_price) : undefined,
        discount: p.original_price
            ? Math.round((1 - parseFloat(p.base_price) / parseFloat(p.original_price)) * 100)
            : undefined,
        rating: p.rating || 0,
        reviews: p.review_count || 0,
        reviewCount: p.review_count || 0,
        image: p.primary_image?.image_path
            ? (p.primary_image.image_path.startsWith('/') ? p.primary_image.image_path : `/images/products/${p.primary_image.image_path}`)
            : '/images/products/placeholder.png',
        alt: p.primary_image?.alt_text || p.name,
        description: p.description,
        colors: p.colors?.map(c => c.hex_code) || [],
        isNew: p.is_new,
        is_featured: p.is_featured,
        is_bestseller: p.is_bestseller,
        currency: p.currency || 'USD',
    })) || [];

    const paginationData = {
        currentPage: paginatedProducts?.current_page || 1,
        lastPage: paginatedProducts?.last_page || 1,
        total: paginatedProducts?.total || 0,
        perPage: paginatedProducts?.per_page || 12,
        links: paginatedProducts?.links || [],
    };

    return (
        <>
            <Header />
            <ProductCatalogInteractive 
                initialProducts={products} 
                pagination={paginationData}
            />
        </>
    );
}
