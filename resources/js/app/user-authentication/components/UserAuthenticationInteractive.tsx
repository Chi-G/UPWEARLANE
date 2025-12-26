import { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticationForm from './AuthenticationForm';
import SocialAuthButtons from './SocialAuthButtons';
import SecurityBadges from './SecurityBadges';
import BenefitsList from './BenefitsList';
import PropTypes from 'prop-types';

export default function UserAuthenticationInteractive({ benefits }: { benefits: any[] }) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleFormSubmit = (formData: any) => {
    setIsLoading(true);
    setSuccessMessage('');

    // Simulate API call
    setTimeout(() => {
      try {
        localStorage.setItem('user_authenticated', 'true');
        localStorage.setItem('user_email', formData?.email);
        localStorage.setItem('user_name', formData?.name || formData?.email?.split('@')?.[0]);

        setIsLoading(false);
        setSuccessMessage(
          isSignUp
            ? 'Account created successfully! Redirecting...' :'Signed in successfully! Redirecting...'
        );

        window.dispatchEvent(new Event('auth-state-changed'));

        setTimeout(() => {
          router.visit('/landing-page');
        }, 1500);
      } catch (error) {
        console.error('Authentication error:', error);
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setSuccessMessage('');

    setTimeout(() => {
      try {
        localStorage.setItem('user_authenticated', 'true');
        localStorage.setItem('user_email', 'user@gmail.com');
        localStorage.setItem('user_name', 'Google User');

        setSuccessMessage('Signed in with Google successfully! Redirecting...');

        window.dispatchEvent(new Event('auth-state-changed'));

        setTimeout(() => {
          router.visit('/landing-page');
        }, 1500);
      } catch (error) {
        console.error('Google authentication error:', error);
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleGuestCheckout = () => {
    try {
      localStorage.setItem('guest_checkout', 'true');
      router.visit('/checkout-flow');
    } catch (error) {
      console.error('Guest checkout error:', error);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Form */}
          <div className="w-full">
            <div className="bg-card border border-border rounded-2xl shadow-gold-md p-6 md:p-8 lg:p-10">
              {/* Header */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h1>
                {/* The following line was part of the instruction, but it's syntactically incorrect and out of place here.
                    It seems to be a fragment from a different component (e.g., a carousel).
                    To maintain syntactic correctness, it's commented out or removed.
                    newArrivals?.slice(slideIndex * itemsPerView?.desktop, (slideIndex + 1) * itemsPerView?.desktop)?.map((product: any) => (
                */}
                <p className="text-sm md:text-base text-muted-foreground">
                  {isSignUp
                    ? 'Join UpWearLane for exclusive tech fashion deals'
                    : 'Sign in to access your account and orders'}
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-success-foreground">{successMessage}</p>
                </div>
              )}

              {/* Social Auth */}
              <SocialAuthButtons onGoogleAuth={handleGoogleAuth} isLoading={isLoading} />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <AuthenticationForm
                isSignUp={isSignUp}
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <button
                  onClick={toggleMode}
                  disabled={isLoading}
                  className="text-sm text-primary hover:text-primary/80 transition-smooth disabled:opacity-50"
                >
                  {isSignUp
                    ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>

              {/* Guest Checkout */}
              {!isSignUp && (
                <div className="mt-6 pt-6 border-t border-border">
                  <button
                    onClick={handleGuestCheckout}
                    disabled={isLoading}
                    className="w-full text-sm text-muted-foreground hover:text-foreground transition-smooth disabled:opacity-50"
                  >
                    Continue as guest
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Benefits & Security */}
          <div className="w-full space-y-6 md:space-y-8">
            {/* Benefits */}
            <div className="bg-card border border-border rounded-2xl shadow-gold-md p-6 md:p-8">
              <BenefitsList benefits={benefits} />
            </div>

            {/* Security Badges */}
            <SecurityBadges />

            {/* Additional Info */}
            <div className="bg-accent/50 border border-border rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Secure Shopping</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Your data is protected with industry-standard encryption. We never share your
                personal information with third parties.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 bg-background rounded-full text-xs font-medium text-foreground border border-border">
                  256-bit SSL
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-background rounded-full text-xs font-medium text-foreground border border-border">
                  PCI DSS Compliant
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-background rounded-full text-xs font-medium text-foreground border border-border">
                  GDPR Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserAuthenticationInteractive.propTypes = {
  benefits: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};