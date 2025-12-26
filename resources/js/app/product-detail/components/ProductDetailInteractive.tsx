import PropTypes from 'prop-types';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';
import { ProductDetailProps } from '@/types';

export default function ProductDetailInteractive({ product, reviews, relatedProducts }: ProductDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-4 sm:px-8 mt-20 py-8 md:py-12 lg:py-16">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-16 md:mb-20 lg:mb-24">
          <ProductImageGallery images={product?.images} productName={product?.name} />
          <ProductInfo product={product} />
        </div>

        {/* Customer Reviews Section */}
        <div className="mb-16 md:mb-20 lg:mb-24">
          <CustomerReviews reviews={reviews} productId={product?.id} />
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
      })
    )?.isRequired,
    colors: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        hex: PropTypes?.string?.isRequired,
      })
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
    })
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
    })
  )?.isRequired,
};