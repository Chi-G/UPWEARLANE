import { useState } from 'react';
import PropTypes from 'prop-types';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { ProductImageGalleryProps } from '@/types';

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === images?.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-[3/4] bg-surface rounded-2xl overflow-hidden group">
        <AppImage
          src={images?.[selectedImageIndex]?.url}
          alt={images?.[selectedImageIndex]?.alt}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
          priority
        />

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-background/90 hover:bg-background text-foreground rounded-full shadow-gold-md opacity-0 group-hover:opacity-100 transition-all press-effect"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-background/90 hover:bg-background text-foreground rounded-full shadow-gold-md opacity-0 group-hover:opacity-100 transition-all press-effect"
              aria-label="Next image"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 text-foreground text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background/90 text-foreground text-sm font-data rounded-full">
          {selectedImageIndex + 1} / {images?.length}
        </div>
      </div>
      {/* Thumbnail Gallery */}
      {images?.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-3">
          {images?.map((image: { url: string; alt: string }, index: number) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all press-effect ${
                selectedImageIndex === index
                  ? 'border-primary shadow-gold'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label={`View image ${index + 1}`} 
            >
              <AppImage
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

ProductImageGallery.propTypes = {
  images: PropTypes?.arrayOf(
    PropTypes?.shape({
      url: PropTypes?.string?.isRequired,
      alt: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
  productName: PropTypes?.string?.isRequired,
};