import { router } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import AuthenticationForm from './AuthenticationForm';
import BenefitsList from './BenefitsList';
import SecurityBadges from './SecurityBadges';
import SocialAuthButtons from './SocialAuthButtons';

import { Benefit, AuthenticationFormData } from '@/types';

export default function UserAuthenticationInteractive({
    benefits,
}: {
    benefits: Benefit[];
}) {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleFormSubmit = (formData: AuthenticationFormData) => {
        setIsLoading(true);
        setSuccessMessage('');

        // Simulate API call
        setTimeout(() => {
            try {
                localStorage.setItem('user_authenticated', 'true');
                localStorage.setItem('user_email', formData?.email);
                localStorage.setItem(
                    'user_name',
                    formData?.name || formData?.email?.split('@')?.[0],
                );

                setIsLoading(false);
                setSuccessMessage(
                    isSignUp
                        ? 'Account created successfully! Redirecting...'
                        : 'Signed in successfully! Redirecting...',
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

                setSuccessMessage(
                    'Signed in with Google successfully! Redirecting...',
                );

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
        <div className="bg-background min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left Column - Form */}
                    <div className="w-full">
                        <div className="bg-card border-border shadow-gold-md rounded-2xl border p-6 md:p-8 lg:p-10">
                            {/* Header */}
                            <div className="mb-6 md:mb-8">
                                <h1 className="font-heading text-foreground mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
                                    {isSignUp
                                        ? 'Create Account'
                                        : 'Welcome Back'}
                                </h1>
                                
                                <p className="text-muted-foreground text-sm md:text-base">
                                    {isSignUp
                                        ? 'Join UpWearLane for exclusive tech fashion deals'
                                        : 'Sign in to access your account and orders'}
                                </p>
                            </div>

                            {/* Success Message */}
                            {successMessage && (
                                <div className="bg-success/10 border-success/20 mb-6 flex items-center gap-3 rounded-lg border p-4">
                                    <div className="bg-success flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                                        <svg
                                            className="h-3 w-3 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-success-foreground text-sm font-medium">
                                        {successMessage}
                                    </p>
                                </div>
                            )}

                            {/* Social Auth */}
                            <SocialAuthButtons
                                onGoogleAuth={handleGoogleAuth}
                                isLoading={isLoading}
                            />

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="border-border w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-card text-muted-foreground px-4">
                                        Or continue with email
                                    </span>
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
                                    className="text-primary hover:text-primary/80 transition-smooth text-sm disabled:opacity-50"
                                >
                                    {isSignUp
                                        ? 'Already have an account? Sign in'
                                        : "Don't have an account? Sign up"}
                                </button>
                            </div>

                            {/* Guest Checkout */}
                            {!isSignUp && (
                                <div className="border-border mt-6 border-t pt-6">
                                    <button
                                        onClick={handleGuestCheckout}
                                        disabled={isLoading}
                                        className="text-muted-foreground hover:text-foreground transition-smooth w-full text-sm disabled:opacity-50"
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
                        <div className="bg-card border-border shadow-gold-md rounded-2xl border p-6 md:p-8">
                            <BenefitsList benefits={benefits} />
                        </div>

                        {/* Security Badges */}
                        <SecurityBadges />

                        {/* Additional Info */}
                        <div className="bg-accent/50 border-border rounded-2xl border p-6 md:p-8">
                            <h3 className="text-foreground mb-4 text-lg font-semibold">
                                Secure Shopping
                            </h3>
                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                Your data is protected with industry-standard
                                encryption. We never share your personal
                                information with third parties.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="bg-background text-foreground border-border inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                                    256-bit SSL
                                </span>
                                <span className="bg-background text-foreground border-border inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                                    PCI DSS Compliant
                                </span>
                                <span className="bg-background text-foreground border-border inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
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
        }),
    )?.isRequired,
};
