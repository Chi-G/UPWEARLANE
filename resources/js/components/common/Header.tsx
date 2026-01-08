import AuthenticationModal from '@/components/common/AuthenticationModal';
import CurrencyRegionSelector from '@/components/common/CurrencyRegionSelector';
import Icon from '@/components/ui/AppIcon';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import ShoppingCartIndicator from './ShoppingCartIndicator';

export default function Header() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const showVerificationBanner = !!(user && !user.email_verified_at);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Check initial theme
        const checkTheme = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };
        
        checkTheme();

        // Watch for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        });

        return () => observer.disconnect();
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

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
        {showVerificationBanner && (
            <div className="bg-yellow-500 text-white text-center text-sm py-2 px-4 fixed top-0 w-full z-[60]">
                <span>Your email address is not verified. </span>
                <Link href={route('verification.notice')} className="underline font-bold hover:text-yellow-100">
                    Verify Now
                </Link>
            </div>
        )}
            <header
                className={`bg-background border-border transition-smooth fixed left-0 w-full border-b ${
                    isScrolled ? 'shadow-gold-sm' : ''
                } ${showVerificationBanner ? 'top-8' : 'top-0'} z-50`}
            >
                <div className="mx-auto px-4 sm:px-8">
                    <div className="flex h-16 items-center justify-between lg:h-20">
                        {/* Logo */}
                        <Link 
                            href="/"
                            className="hover-lift flex items-center gap-3 no-underline outline-none"
                        >
                            <div className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-lg overflow-hidden bg-slate-950 shadow-sm shrink-0">
                                <img src={isDarkMode ? "/logo.png?v=1.3" : "/logo1.png?v=1.3"} alt="UpWearLane" className="h-8 lg:h-10 w-auto object-contain" />
                            </div>
                            <span className="font-heading text-foreground text-xl font-bold leading-none">
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
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center gap-2 outline-none">
                                        <Icon name="UserIcon" size={24} />
                                        <span className="text-sm font-medium hidden xl:block">
                                            {user.name.split(' ')[0]}
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('profile.edit')} className="cursor-pointer w-full">
                                                    <Icon name="UserIcon" size={16} className="mr-2" />
                                                    <span>Profile</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('user-password.edit')} className="cursor-pointer w-full">
                                                    <Icon name="LockClosedIcon" size={16} className="mr-2" />
                                                    <span>Security</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                                                <Icon name="ArrowRightOnRectangleIcon" size={16} className="mr-2" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <button
                                    onClick={handleAuthClick}
                                    className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center"
                                    aria-label="Account"
                                >
                                    <Icon name="UserIcon" size={24} />
                                </button>
                            )}
                            <ShoppingCartIndicator />
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex items-center space-x-3 lg:hidden">
                            <ShoppingCartIndicator />
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center outline-none">
                                        <Icon name="UserIcon" size={24} />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('profile.edit')} className="cursor-pointer w-full">
                                                    <Icon name="UserIcon" size={16} className="mr-2" />
                                                    <span>Profile</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('user-password.edit')} className="cursor-pointer w-full">
                                                    <Icon name="LockClosedIcon" size={16} className="mr-2" />
                                                    <span>Security</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                                                <Icon name="ArrowRightOnRectangleIcon" size={16} className="mr-2" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <button
                                    onClick={handleAuthClick}
                                    className="touch-target text-foreground hover:text-primary transition-smooth flex items-center justify-center"
                                    aria-label="Account"
                                >
                                    <Icon name="UserIcon" size={24} />
                                </button>
                            )}
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
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg overflow-hidden bg-slate-950 shadow-sm">
                                <img src={isDarkMode ? "/logo.png?v=1.3" : "/logo1.png?v=1.3"} alt="UpWearLane" className="h-12 w-auto object-contain contrast-110" />
                            </div>
                            <span className="font-heading text-foreground text-xl font-bold">
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
                            {user ? (
                                <>
                                    <li className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                        Account
                                    </li>
                                    <li>
                                        <Link
                                            href={route('profile.edit')}
                                            onClick={closeMobileMenu}
                                            className="text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth flex w-full items-center space-x-3 rounded-lg px-4 py-3"
                                        >
                                            <Icon name="UserIcon" size={24} />
                                            <span className="text-base font-medium">Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href={route('user-password.edit')}
                                            onClick={closeMobileMenu}
                                            className="text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth flex w-full items-center space-x-3 rounded-lg px-4 py-3"
                                        >
                                            <Icon name="LockClosedIcon" size={24} />
                                            <span className="text-base font-medium">Security</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                closeMobileMenu();
                                            }}
                                            className="text-destructive hover:bg-destructive/10 transition-smooth flex w-full items-center space-x-3 rounded-lg px-4 py-3"
                                        >
                                            <Icon name="ArrowRightOnRectangleIcon" size={24} />
                                            <span className="text-base font-medium">Log out</span>
                                        </button>
                                    </li>
                                </>
                            ) : (
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
                            )}
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
