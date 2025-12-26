import React, { useState } from 'react';
import PropTypes from 'prop-types';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    fill?: boolean;
    sizes?: string;
    fallbackSrc?: string;
}

function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false, // Kept for prop compatibility but unused
    quality = 75, // Kept for prop compatibility but unused
    placeholder = 'empty', // Kept for prop compatibility but unused
    blurDataURL, // Kept for prop compatibility but unused
    fill = false,
    sizes,
    onClick,
    fallbackSrc = '/assets/images/no_image.png',
    ...props
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const commonClassName = `${className} ${isLoading ? 'bg-gray-200' : ''} ${onClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`;

    const imgStyle: React.CSSProperties = {
        objectFit: fill ? 'cover' : undefined,
    };

    if (width) imgStyle.width = width;
    if (height) imgStyle.height = height;

    if (fill) {
        return (
            <div className={`relative ${className}`} style={{ width: width || '100%', height: height || '100%' }}>
                <img
                    src={imageSrc}
                    alt={alt}
                    className={`${commonClassName} absolute inset-0 w-full h-full`}
                    onError={handleError}
                    onLoad={handleLoad}
                    onClick={onClick}
                    style={imgStyle}
                    {...props}
                />
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={commonClassName}
            onError={handleError}
            onLoad={handleLoad}
            onClick={onClick}
            style={imgStyle}
            width={width}
            height={height}
            {...props}
        />
    );
}

AppImage.propTypes = {
    src: PropTypes?.string?.isRequired,
    alt: PropTypes?.string?.isRequired,
    width: PropTypes?.number,
    height: PropTypes?.number,
    className: PropTypes?.string,
    priority: PropTypes?.bool,
    quality: PropTypes?.number,
    placeholder: PropTypes?.oneOf(['blur', 'empty']),
    blurDataURL: PropTypes?.string,
    fill: PropTypes?.bool,
    sizes: PropTypes?.string,
    onClick: PropTypes?.func,
    fallbackSrc: PropTypes?.string,
};

export default AppImage;