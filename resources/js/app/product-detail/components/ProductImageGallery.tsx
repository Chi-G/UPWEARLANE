import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { ProductImageGalleryProps } from '@/types';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function ProductImageGallery({
    images,
}: ProductImageGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const handlePrevious = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? images?.length - 1 : prev - 1,
        );
    };

    const handleNext = () => {
        setSelectedImageIndex((prev) =>
            prev === images?.length - 1 ? 0 : prev + 1,
        );
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
            <div className="bg-surface group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <AppImage
                    src={images?.[selectedImageIndex]?.url}
                    alt={images?.[selectedImageIndex]?.alt}
                    className={`h-full w-full object-cover transition-transform duration-300 ${
                        isZoomed
                            ? 'scale-150 cursor-zoom-out'
                            : 'cursor-zoom-in'
                    }`}
                    onClick={toggleZoom}
                    priority
                />

                {/* Navigation Arrows */}
                {images?.length > 1 && (
                    <>
                        <button
                            onClick={handlePrevious}
                            className="bg-background/90 hover:bg-background text-foreground shadow-gold-md press-effect absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100 md:h-12 md:w-12"
                            aria-label="Previous image"
                        >
                            <Icon name="ChevronLeftIcon" size={24} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-background/90 hover:bg-background text-foreground shadow-gold-md press-effect absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100 md:h-12 md:w-12"
                            aria-label="Next image"
                        >
                            <Icon name="ChevronRightIcon" size={24} />
                        </button>
                    </>
                )}

                {/* Zoom Indicator */}
                <div className="bg-background/90 text-foreground absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100">
                    {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
                </div>

                {/* Image Counter */}
                <div className="bg-background/90 text-foreground font-data absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-3 py-1.5 text-sm">
                    {selectedImageIndex + 1} / {images?.length}
                </div>
            </div>
            {/* Thumbnail Gallery */}
            {images?.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 md:gap-3">
                    {images?.map(
                        (
                            image: { url: string; alt: string },
                            index: number,
                        ) => (
                            <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={`press-effect relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                                    selectedImageIndex === index
                                        ? 'border-primary shadow-gold'
                                        : 'border-border hover:border-primary/50'
                                }`}
                                aria-label={`View image ${index + 1}`}
                            >
                                <AppImage
                                    src={image?.url}
                                    alt={image?.alt}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ),
                    )}
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
        }),
    )?.isRequired,
    productName: PropTypes?.string?.isRequired,
};
