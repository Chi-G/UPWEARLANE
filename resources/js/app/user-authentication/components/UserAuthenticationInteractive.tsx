import { router, useForm } from '@inertiajs/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import AuthenticationForm from './AuthenticationForm';
import BenefitsList from './BenefitsList';
import SecurityBadges from './SecurityBadges';
import SocialAuthButtons from './SocialAuthButtons';

import { Benefit } from '@/types';

export default function UserAuthenticationInteractive({
    benefits,
    initialMode = 'login',
}: {
    benefits: Benefit[];
    initialMode?: 'login' | 'register';
}) {
    const isSignUp = initialMode === 'register';

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        acceptTerms: false,
        remember: false,
    });

    useEffect(() => {
        clearErrors();
        reset('password', 'password_confirmation');
    }, [isSignUp, clearErrors, reset]);

    const handleFormSubmit = () => {
        if (isSignUp) {
            post(route('register'), {
                onFinish: () => reset('password', 'password_confirmation'),
            });
        } else {
            post(route('login'), {
                onFinish: () => reset('password'),
            });
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = route('auth.google');
    };

    const toggleMode = () => {
        const targetRoute = isSignUp ? 'login' : 'register';
        router.visit(route(targetRoute));
    };

    return (
        <div className="bg-background min-h-screen pt-20 lg:pt-24">
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

                            {/* Social Auth */}
                            <SocialAuthButtons
                                onGoogleAuth={handleGoogleAuth}
                                isLoading={processing}
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
                                data={data}
                                setData={setData}
                                errors={errors}
                                processing={processing}
                                onSubmit={handleFormSubmit}
                            />

                            {/* Toggle Mode */}
                            <div className="mt-6 text-center">
                                <button
                                    onClick={toggleMode}
                                    disabled={processing}
                                    className="text-primary hover:text-primary/80 transition-smooth text-sm disabled:opacity-50"
                                >
                                    {isSignUp
                                        ? 'Already have an account? Sign in'
                                        : "Don't have an account? Sign up"}
                                </button>
                            </div>
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
    benefits: PropTypes.array,
    initialMode: PropTypes.string,
};
