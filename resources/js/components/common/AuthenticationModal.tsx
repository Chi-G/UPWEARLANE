import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '@/components/ui/AppIcon';

interface AuthenticationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthenticationModal({ isOpen, onClose }: AuthenticationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef?.current && !modalRef?.current?.contains(e?.target as Node)) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      localStorage.setItem('user_authenticated', 'true');
      localStorage.setItem('user_email', formData?.email);
      setIsLoading(false);
      onClose();
      window.dispatchEvent(new Event('auth-state-changed'));
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      console.log('Google authentication initiated');
      localStorage.setItem('user_authenticated', 'true');
      localStorage.setItem('user_email', 'user@gmail.com');
      setIsLoading(false);
      onClose();
      window.dispatchEvent(new Event('auth-state-changed'));
    }, 1500);
  };

  const handleGuestCheckout = () => {
    localStorage.setItem('guest_checkout', 'true');
    onClose();
    window.location.href = '/checkout-flow';
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: '', password: '', name: '' });
  };

  if (!mounted || !isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md bg-background rounded-2xl shadow-gold-2xl overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 id="auth-modal-title" className="font-heading text-2xl font-semibold text-foreground">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <button
            onClick={onClose}
            className="touch-target flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close modal"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 h-12 px-6 bg-surface hover:bg-accent text-foreground rounded-lg border border-border transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  required={isSignUp}
                  className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData?.password}
                onChange={handleInputChange}
                required
                className="w-full h-12 px-4 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center">
            <button
              onClick={toggleMode}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          {/* Guest Checkout */}
          {!isSignUp && (
            <div className="pt-4 border-t border-border">
              <button
                onClick={handleGuestCheckout}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Continue as guest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}