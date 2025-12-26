import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';
import ShoppingCartIndicator from './ShoopingCartIndicator';
import AuthenticationModal from '@/components/common/AuthenticationModal';
import CurrencyRegionSelector from '@/components/common/CurrencyRegionSelector';

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

  const navigationItems = [
    { label: 'Shop', path: '/product-catalog', icon: 'ShoppingBagIcon' },
    { label: 'Support', path: '/support', icon: 'LifebuoyIcon' },
    { label: 'Cart', path: '/shopping-cart', icon: 'ShoppingCartIcon', showOnDesktop: false },
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
        className={`fixed top-0 left-0 w-full z-50 bg-background border-b border-border transition-smooth ${
          isScrolled ? 'shadow-gold-sm' : ''
        }`}
      >
        <div className="mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover-lift">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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
              <span className="font-heading text-xl font-semibold text-foreground hidden sm:block">
                UpWearLane
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.filter((item) => item?.showOnDesktop !== false)?.map((item) => (
                  <Link
                    key={item?.path}
                    href={item?.path}
                    className="text-base font-medium text-foreground hover:text-primary transition-smooth relative group"
                  >
                    {item?.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <CurrencyRegionSelector />
              <button
                onClick={handleAuthClick}
                className="touch-target flex items-center justify-center text-foreground hover:text-primary transition-smooth"
                aria-label="Account"
              >
                <Icon name="UserIcon" size={24} />
              </button>
              <ShoppingCartIndicator />
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-3">
              <ShoppingCartIndicator />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="touch-target flex items-center justify-center text-foreground hover:text-primary transition-smooth"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
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
        className={`fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-background z-[70] transform transition-transform duration-300 ease-smooth lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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
              <span className="font-heading text-xl font-semibold text-foreground">
                UpWearLane
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="touch-target flex items-center justify-center text-foreground hover:text-primary transition-smooth"
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
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
                  >
                    <Icon name={item?.icon as any} size={24} />
                    <span className="text-base font-medium">{item?.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={handleAuthClick}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-smooth"
                >
                  <Icon name="UserIcon" size={24} />
                  <span className="text-base font-medium">Account</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-border">
            <CurrencyRegionSelector />
          </div>
        </div>
      </div>
      {/* Authentication Modal */}
      <AuthenticationModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}