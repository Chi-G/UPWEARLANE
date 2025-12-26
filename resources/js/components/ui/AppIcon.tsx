'use client';

import React from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
import * as HeroIconsSolid from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Github,
    Chrome
} from 'lucide-react';
import PropTypes from 'prop-types';

// Removed unused HeroIconName type to satisfy lint rule

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: string;
    variant?: 'outline' | 'solid';
    size?: number;
    className?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    disabled?: boolean;
}

function Icon({
    name,
    variant = 'outline',
    size = 24,
    className = '',
    onClick,
    disabled = false,
    ...props
}: IconProps) {
    const iconSet = variant === 'solid' ? HeroIconsSolid : HeroIcons;

    // Support for common social brands via Lucide
    const brands: Record<string, React.ElementType> = {
        Facebook,
        Twitter,
        Instagram,
        Linkedin,
        Youtube,
        Github,
        Chrome
    };

    const IconComponent = (iconSet as Record<string, React.ElementType>)[name] || brands[name];

    if (!IconComponent) {
        return (
            <QuestionMarkCircleIcon
                width={size}
                height={size}
                className={`text-gray-400 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
                onClick={disabled ? undefined : onClick}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            width={size}
            height={size}
            className={`${disabled ? 'opacity-50 cursor-not-allowed' : onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
            onClick={disabled ? undefined : onClick}
            {...props}
        />
    );
}

Icon.propTypes = {
    name: PropTypes?.string?.isRequired,
    variant: PropTypes?.oneOf(['outline', 'solid']),
    size: PropTypes?.number,
    className: PropTypes?.string,
    onClick: PropTypes?.func,
    disabled: PropTypes?.bool,
};

export default Icon;
