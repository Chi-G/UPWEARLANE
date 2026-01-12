
import { ProductDetailProps } from '@/types';
import PropTypes from 'prop-types';
import CustomerReviews from './CustomerReviews';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import RelatedProducts from './RelatedProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useEffect } from 'react';

export default function ProductDetailInteractive({
    product,
    reviews,
    relatedProducts,
}: ProductDetailProps) {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="bg-background min-h-screen">
                <div className="mx-auto mt-20 px-4 py-8 sm:px-8 md:py-12 lg:py-16">
                    {/* Skeleton Product Main Section */}
                    <div className="mb-16 grid grid-cols-1 gap-8 md:mb-20 md:gap-12 lg:mb-24 lg:grid-cols-2 lg:gap-16">
                        <div className="bg-muted aspect-[3/4] w-full rounded-2xl">
                            <Skeleton className="h-[400px] w-full rounded-2xl" />
                        </div>
                        <div className="space-y-6 md:space-y-8">
                            <Skeleton className="h-8 w-1/3 mb-2" />
                            <Skeleton className="h-12 w-2/3 mb-2" />
                            <Skeleton className="h-6 w-1/4 mb-2" />
                            <Skeleton className="h-6 w-1/2 mb-2" />
                            <Skeleton className="h-10 w-1/2 mb-2" />
                            <Skeleton className="h-10 w-1/3 mb-2" />
                            <Skeleton className="h-10 w-1/3 mb-2" />
                            <Skeleton className="h-12 w-full mb-2" />
                            <Skeleton className="h-24 w-full mb-2" />
                        </div>
                    </div>
                    {/* Skeleton Customer Reviews Section */}
                    <div className="mb-16 md:mb-20 lg:mb-24">
                        <Skeleton className="h-8 w-1/4 mb-4" />
                        <div className="space-y-4">
                            <Skeleton className="h-6 w-1/2" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>
                    {/* Skeleton Related Products Section */}
                    <div>
                        <Skeleton className="h-8 w-1/4 mb-4" />
                        <div className="flex gap-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-48">
                                    <Skeleton className="h-64 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4 mb-1" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen">
            <div className="mx-auto mt-20 px-4 py-8 sm:px-8 md:py-12 lg:py-16">
                {/* Product Main Section */}
                <div className="mb-16 grid grid-cols-1 gap-8 md:mb-20 md:gap-12 lg:mb-24 lg:grid-cols-2 lg:gap-16">
                    <ProductImageGallery
                        images={product?.images}
                    />
                    <ProductInfo product={product} />
                </div>

                {/* Customer Reviews Section */}
                <div className="mb-16 md:mb-20 lg:mb-24">
                    <CustomerReviews
                        reviews={reviews}
                        productId={product?.id}
                    />
                </div>

                {/* Related Products Section */}
                <div>
                    <RelatedProducts products={relatedProducts} />
                </div>
            </div>
        </div>
    );
}

ProductDetailInteractive.propTypes = {
    product: PropTypes?.shape({
        id: PropTypes?.number?.isRequired,
        name: PropTypes?.string?.isRequired,
        category: PropTypes?.string?.isRequired,
        price: PropTypes?.number?.isRequired,
        originalPrice: PropTypes?.number,
        rating: PropTypes?.number?.isRequired,
        reviewCount: PropTypes?.number?.isRequired,
        description: PropTypes?.string?.isRequired,
        isNew: PropTypes?.bool,
        inStock: PropTypes?.bool?.isRequired,
        images: PropTypes?.arrayOf(
            PropTypes?.shape({
                url: PropTypes?.string?.isRequired,
                alt: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
        colors: PropTypes?.arrayOf(
            PropTypes?.shape({
                name: PropTypes?.string?.isRequired,
                hex: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
        sizes: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
        features: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
        specifications: PropTypes?.object?.isRequired,
    })?.isRequired,
    reviews: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.number?.isRequired,
            userName: PropTypes?.string?.isRequired,
            userImage: PropTypes?.string?.isRequired,
            userImageAlt: PropTypes?.string?.isRequired,
            rating: PropTypes?.number?.isRequired,
            title: PropTypes?.string?.isRequired,
            comment: PropTypes?.string?.isRequired,
            date: PropTypes?.string?.isRequired,
            verified: PropTypes?.bool?.isRequired,
            helpfulCount: PropTypes?.number?.isRequired,
        }),
    )?.isRequired,
    relatedProducts: PropTypes?.arrayOf(
        PropTypes?.shape({
            id: PropTypes?.number?.isRequired,
            name: PropTypes?.string?.isRequired,
            price: PropTypes?.number?.isRequired,
            originalPrice: PropTypes?.number,
            rating: PropTypes?.number?.isRequired,
            reviewCount: PropTypes?.number?.isRequired,
            image: PropTypes?.string?.isRequired,
            imageAlt: PropTypes?.string?.isRequired,
            isNew: PropTypes?.bool,
            discount: PropTypes?.number,
        }),
    )?.isRequired,
};
