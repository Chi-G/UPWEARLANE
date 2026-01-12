import Header from '@/components/common/Header';
import { usePage } from '@inertiajs/react';
import ProductDetailInteractive from './components/ProductDetailInteractive';

interface ProductImage {
    id: number;
    image_path: string;
    alt_text: string;
    is_primary: boolean;
}

interface ProductColor {
    id: number;
    name: string;
    hex_code: string;
}

interface ProductFeature {
    id: number;
    name: string;
}

interface ProductVariant {
    id: number;
    name: string;
    value: string;
    stock_quantity: number;
}

interface Review {
    id: number;
    rating: number;
    title: string;
    comment: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        profile_photo_url?: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface ProductData {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description?: string;
    base_price: string | number;
    original_price?: string | number;
    discount_percentage?: number;
    rating: string | number;
    review_count: number;
    stock_quantity: number;
    is_new: boolean;
    is_featured: boolean;
    is_bestseller: boolean;
    specifications?: Record<string, string>;
    category?: Category;
    images: ProductImage[];
    colors: ProductColor[];
    features: ProductFeature[];
    variants: ProductVariant[];
    approved_reviews: Review[];
    currency?: string;
}

interface RelatedProduct {
    id: number;
    name: string;
    currency: string;
    base_price: string | number;
    original_price?: string | number;
    rating: string | number;
    review_count: number;
    is_new: boolean;
    discount_percentage?: number;
    primary_image?: ProductImage;
    colors: ProductColor[];
}

interface PageProps {
    product: ProductData;
    relatedProducts: RelatedProduct[];
}

export default function ProductDetailPage() {
    const { product, relatedProducts } = usePage<{ props: PageProps }>().props as unknown as PageProps;

    // Transform product data to match frontend format
    const transformedProduct = {
        id: product.id,
        name: product.name,
        currency: product.currency || 'NGN',
        category: product.category?.name || 'Uncategorized',
        price: typeof product.base_price === 'string' ? parseFloat(product.base_price) : product.base_price,
        originalPrice: product.original_price
            ? (typeof product.original_price === 'string' ? parseFloat(product.original_price) : product.original_price)
            : undefined,
        rating: typeof product.rating === 'string' ? parseFloat(product.rating) : product.rating,
        reviewCount: product.review_count || 0,
        description: product.description || '',
        isNew: product.is_new,
        inStock: product.stock_quantity > 0,
        images: product.images?.map(img => ({
            url: img.image_path.startsWith('http') ? img.image_path : img.image_path,
            alt: img.alt_text || product.name,
        })) || [],
        colors: product.colors?.map(color => ({
            name: color.name,
            hex: color.hex_code,
        })) || [],
        sizes: product.variants
            ?.filter(v => v.name === 'Size')
            ?.map(v => v.value)
            .filter(Boolean) || ['S', 'M', 'L', 'XL'],
        features: product.features?.map(f => f.name) || [],
        specifications: product.specifications || {},
        image: product.images?.[0]?.image_path
            ? (product.images[0].image_path.startsWith('http')
                ? product.images[0].image_path
                : product.images[0].image_path)
            : '/images/placeholder.png',
        alt: product.images?.[0]?.alt_text || product.name,
        discount: product.discount_percentage || undefined,
    };

    // Transform reviews data
    const transformedReviews = product.approved_reviews?.map(review => ({
        id: review.id,
        userName: review.user?.name || 'Anonymous',
        userImage: review.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || 'A')}&background=random`,
        userImageAlt: `Profile photo of ${review.user?.name || 'Anonymous'}`,
        rating: review.rating,
        title: review.title || 'Review',
        comment: review.comment,
        date: review.created_at,
        verified: true,
        helpfulCount: 0,
    })) || [];

    // Transform related products
    const transformedRelatedProducts = relatedProducts?.map(rp => ({
        id: rp.id,
        name: rp.name,
        currency: rp.currency || 'NGN',
        category: 'Related',
        price: typeof rp.base_price === 'string' ? parseFloat(rp.base_price) : rp.base_price,
        originalPrice: rp.original_price
            ? (typeof rp.original_price === 'string' ? parseFloat(rp.original_price) : rp.original_price)
            : undefined,
        rating: typeof rp.rating === 'string' ? parseFloat(rp.rating) : rp.rating,
        reviewCount: rp.review_count || 0,
        image: rp.primary_image?.image_path
            ? (rp.primary_image.image_path.startsWith('http')
                ? rp.primary_image.image_path
                : rp.primary_image.image_path)
            : '/images/placeholder.png',
        imageAlt: rp.primary_image?.alt_text || rp.name,
        alt: rp.primary_image?.alt_text || rp.name,
        description: '',
        isNew: rp.is_new,
        discount: rp.discount_percentage || undefined,
    })) || [];

    return (
        <>
            <Header />
            <ProductDetailInteractive
                product={transformedProduct}
                reviews={transformedReviews}
                relatedProducts={transformedRelatedProducts}
            />
        </>
    );
}
