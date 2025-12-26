import AuthenticationModal from '@/components/common/AuthenticationModal';
import CurrencyRegionSelector from '@/components/common/CurrencyRegionSelector';
import Icon from '@/components/ui/AppIcon';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ShoppingCartIndicator from './ShoopingCartIndicator';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    type IconName = 'ShoppingBagIcon' | 'LifebuoyIcon' | 'ShoppingCartIcon';

    const navigationItems: { label: string; path: string; icon: IconName; showOnDesktop?: boolean }[] = [
        { label: 'Shop', path: '/product-catalog', icon: 'ShoppingBagIcon' },
        { label: 'Support', path: '/support', icon: 'LifebuoyIcon' },
        {
            label: 'Cart',
            path: '/shopping-cart',
            icon: 'ShoppingCartIcon',
            showOnDesktop: false,
        },
    ];

    const handleAuthClick = () => {
        setIsAuthModalOpen(true);
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header
                className={`bg-background border-border transition-smooth fixed left-0 top-0 z-50 w-full border-b ${
                    isScrolled ? 'shadow-gold-sm' : ''
                }`}
            >
                <div className="mx-auto px-4 sm:px-8">
                    <div className="flex h-16 items-center justify-between lg:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="hover-lift flex items-center space-x-2"
                        >
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
                            <span className="font-heading text-foreground hidden text-xl font-semibold sm:block">
                                UpWearLane
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center space-x-8 lg:flex">
                            {navigationItems
                                ?.filter(
                                    (item) => item?.showOnDesktop !== false,
                                )
                                ?.map((item) => (
                                    <Link
                                        key={item?.path}
                                        href={item?.path}
                                        className="text-foreground hover:text-primary transition-smooth group relative text-base font-medium"
                                    >
                                        {item?.label}
                                        <span className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden items-center space-x-4 lg:flex">
                            <CurrencyRegionSelector />
                            <button
                                onClick={handleAuthClick}
                                className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center"
                                aria-label="Account"
                            >
                                <Icon name="UserIcon" size={24} />
                            </button>
                            <ShoppingCartIndicator />
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center space-x-3 lg:hidden">
                            <ShoppingCartIndicator />
                            <button
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                                className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center"
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen ? true : false}
                            >
                                <Icon
                                    name={
                                        isMobileMenuOpen
                                            ? 'XMarkIcon'
                                            : 'Bars3Icon'
                                    }
                                    size={24}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}
            {/* Mobile Menu Drawer */}
            <div
                className={`bg-background ease-smooth fixed bottom-0 left-0 top-0 z-[70] w-80 max-w-[85vw] transform transition-transform duration-300 lg:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    {/* Mobile Menu Header */}
                    <div className="border-border flex items-center justify-between border-b p-6">
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
                            <span className="font-heading text-foreground text-xl font-semibold">
                                UpWearLane
                            </span>
                        </div>
                        <button
                            onClick={closeMobileMenu}
                            className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center"
                            aria-label="Close menu"
                        >
                            <Icon name="XMarkIcon" size={24} />
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6">
                        <ul className="space-y-2 px-4">
                            {navigationItems?.map((item) => (
                                <li key={item?.path}>
                                    <Link
                                        href={item?.path}
                                        onClick={closeMobileMenu}
                                        className="text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth flex items-center space-x-3 rounded-lg px-4 py-3"
                                    >
                                        <Icon name={item?.icon} size={24} />
                                        <span className="text-base font-medium">
                                            {item?.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={handleAuthClick}
                                    className="text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth flex w-full items-center space-x-3 rounded-lg px-4 py-3"
                                >
                                    <Icon name="UserIcon" size={24} />
                                    <span className="text-base font-medium">
                                        Account
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="border-border border-t p-6">
                        <CurrencyRegionSelector />
                    </div>
                </div>
            </div>
            {/* Authentication Modal */}
            <AuthenticationModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}
