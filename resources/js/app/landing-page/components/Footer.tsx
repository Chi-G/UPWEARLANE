import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

import { FooterData } from '@/types';

export default function Footer({ footerData }: { footerData: FooterData }) {
    const currentYear = new Date()?.getFullYear();

    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16 lg:py-20">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
                                    <svg
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            d="M20 5L25 15H15L20 5Z"
                                            fill="currentColor"
                                            className="text-primary-foreground"
                                        />
                                        <path
                                            d="M10 18L20 35L30 18H10Z"
                                            fill="currentColor"
                                            className="text-primary-foreground"
                                        />
                                        <circle
                                            cx="20"
                                            cy="20"
                                            r="3"
                                            fill="currentColor"
                                            className="text-primary-foreground"
                                        />
                                    </svg>
                                </div>
                                <span className="font-heading text-xl font-semibold">
                                    UpWearLane
                                </span>
                            </div>
                            <p className="text-secondary-foreground/80 leading-relaxed">
                                {footerData?.companyDescription}
                            </p>
                            <div className="flex items-center space-x-4">
                                {footerData?.socialLinks?.map((social) => (
                                    <a
                                        key={social?.name}
                                        href={social?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-secondary-foreground/10 hover:bg-primary text-secondary-foreground hover:text-primary-foreground transition-smooth press-effect flex h-10 w-10 items-center justify-center rounded-lg"
                                        aria-label={`Follow us on ${social?.name}`}
                                    >
                                        <Icon name={social?.icon} size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6">
                            <h4 className="font-heading text-lg font-semibold">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {footerData?.quickLinks?.map((link) => (
                                    <li key={link?.name}>
                                        <Link
                                            href={link?.url}
                                            className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                                        >
                                            {link?.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="space-y-6">
                            <h4 className="font-heading text-lg font-semibold">
                                Categories
                            </h4>
                            <ul className="space-y-3">
                                {footerData?.categories?.map(
                                    (category) => (
                                        <li key={category?.name}>
                                            <Link
                                                href={category?.url}
                                                className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                                            >
                                                {category?.name}
                                            </Link>
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h4 className="font-heading text-lg font-semibold">
                                Contact Us
                            </h4>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Icon
                                        name="MapPinIcon"
                                        size={20}
                                        className="text-primary mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-secondary-foreground/80 text-sm leading-relaxed">
                                        {footerData?.contact?.address}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Icon
                                        name="PhoneIcon"
                                        size={20}
                                        className="text-primary flex-shrink-0"
                                    />
                                    <a
                                        href={`tel:${footerData?.contact?.phone}`}
                                        className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                                    >
                                        {footerData?.contact?.phone}
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Icon
                                        name="EnvelopeIcon"
                                        size={20}
                                        className="text-primary flex-shrink-0"
                                    />
                                    <a
                                        href={`mailto:${footerData?.contact?.email}`}
                                        className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                                    >
                                        {footerData?.contact?.email}
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="space-y-3">
                                <h5 className="text-sm font-medium">
                                    Secure & Trusted
                                </h5>
                                <div className="flex items-center space-x-3">
                                    {footerData?.trustBadges?.map(
                                        (badge: string, index: number) => (
                                            <div
                                                key={index}
                                                className="bg-secondary-foreground/10 rounded-md px-2 py-1"
                                            >
                                                <span className="text-secondary-foreground/80 text-xs font-medium">
                                                    {badge}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-secondary-foreground/20 border-t py-6">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <div className="text-secondary-foreground/60 text-sm">
                            © {currentYear} UpWearLane. All rights reserved.
                        </div>
                        <div className="flex items-center space-x-6">
                            {footerData?.legalLinks?.map((link) => (
                                <Link
                                    key={link?.name}
                                    href={link?.url}
                                    className="text-secondary-foreground/60 hover:text-primary transition-smooth text-sm"
                                >
                                    {link?.name}
                                </Link>
                            ))}
                        </div>
                        <div className="text-secondary-foreground/60 flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <Icon name="CurrencyDollarIcon" size={16} />
                                <span>Multi-Currency</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon name="TruckIcon" size={16} />
                                <span>Global Shipping</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    footerData: PropTypes?.shape({
        companyDescription: PropTypes?.string?.isRequired,
        socialLinks: PropTypes?.arrayOf(
            PropTypes?.shape({
                name: PropTypes?.string?.isRequired,
                url: PropTypes?.string?.isRequired,
                icon: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
        quickLinks: PropTypes?.arrayOf(
            PropTypes?.shape({
                name: PropTypes?.string?.isRequired,
                url: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
        categories: PropTypes?.arrayOf(
            PropTypes?.shape({
                name: PropTypes?.string?.isRequired,
                url: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
        contact: PropTypes?.shape({
            address: PropTypes?.string?.isRequired,
            phone: PropTypes?.string?.isRequired,
            email: PropTypes?.string?.isRequired,
        })?.isRequired,
        trustBadges: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
        legalLinks: PropTypes?.arrayOf(
            PropTypes?.shape({
                name: PropTypes?.string?.isRequired,
                url: PropTypes?.string?.isRequired,
            }),
        )?.isRequired,
    })?.isRequired,
};
