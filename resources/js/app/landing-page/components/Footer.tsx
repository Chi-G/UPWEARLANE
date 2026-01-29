import Icon from '@/components/ui/AppIcon';
import { Link, usePage } from '@inertiajs/react';

import { FooterData, SharedData } from '@/types';

export default function Footer({ footerData }: { footerData: FooterData }) {
    const { name: appName } = usePage<SharedData>().props;
    const currentYear = new Date()?.getFullYear();

    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 md:py-16 lg:py-20">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <h4 className="font-heading text-xl font-bold text-primary">
                                {appName || 'UpWearLane'}
                            </h4>
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
                                <div className="flex flex-wrap gap-2">
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
                            © {currentYear} {appName || 'UpWearLane'}. All rights reserved.
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
