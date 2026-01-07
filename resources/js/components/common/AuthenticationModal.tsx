import Icon from '@/components/ui/AppIcon';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface AuthenticationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthenticationModal({
    isOpen,
    onClose,
}: AuthenticationModalProps) {
    const [mounted, setMounted] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

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
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(e.target as Node)
        ) {
            onClose();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSignUp) {
            post(route('register'), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        } else {
            post(route('login'), {
                onSuccess: () => {
                    onClose();
                    reset();
                },
            });
        }
    };

    const handleGoogleAuth = () => {
        window.location.href = route('auth.google');
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        reset();
        clearErrors();
    };

    if (!mounted || !isOpen) return null;

    const modalContent = (
        <div
            className="animate-fade-in fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-background shadow-gold-2xl animate-fade-in w-full max-w-md overflow-hidden rounded-2xl flex flex-col max-h-[85vh]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="auth-modal-title"
            >
                {/* Modal Header */}
                <div className="border-border flex items-center justify-between border-b p-6">
                    <h2
                        id="auth-modal-title"
                        className="font-heading text-foreground text-2xl font-semibold"
                    >
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="touch-target text-muted-foreground hover:text-foreground transition-smooth flex items-center justify-center"
                        aria-label="Close modal"
                    >
                        <Icon name="XMarkIcon" size={24} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="space-y-6 p-6 overflow-y-auto">
                    {/* Google OAuth Button */}
                    <button
                        onClick={handleGoogleAuth}
                        disabled={processing}
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth press-effect flex h-12 w-full items-center justify-center space-x-3 rounded-lg border px-6 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
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
                        <span className="font-medium">
                            Continue with Google
                        </span>
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="border-border w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-background text-muted-foreground px-4">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div>
                                <label
                                    htmlFor="name"
                                    className="text-foreground mb-2 block text-sm font-medium"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                    required={isSignUp}
                                    className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                        errors.name ? 'border-destructive' : ''
                                    }`}
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-destructive mt-1 text-sm">{errors.name}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="text-foreground mb-2 block text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                                required
                                className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                    errors.email ? 'border-destructive' : ''
                                }`}
                                placeholder="you@example.com"
                            />
                            {errors.email && (
                                <p className="text-destructive mt-1 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="text-foreground mb-2 block text-sm font-medium"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleInputChange}
                                    required
                                    className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 pr-12 ${
                                        errors.password ? 'border-destructive' : ''
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    title="Show password"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-muted-foreground hover:text-foreground absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                                    tabIndex={-1}
                                >
                                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-destructive mt-1 text-sm">{errors.password}</p>
                            )}
                        </div>

                        {isSignUp && (
                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="text-foreground mb-2 block text-sm font-medium"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={handleInputChange}
                                        required={isSignUp}
                                        className={`bg-input border-border text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 pr-12 ${
                                            errors.password_confirmation ? 'border-destructive' : ''
                                        }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        title="Show confirm password"
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-muted-foreground hover:text-foreground absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                                        tabIndex={-1}
                                    >
                                        <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="text-destructive mt-1 text-sm">{errors.password_confirmation}</p>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 w-full rounded-lg px-8 font-medium disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing
                                ? 'Processing...'
                                : isSignUp
                                  ? 'Create Account'
                                  : 'Sign In'}
                        </button>
                    </form>

                    {/* Toggle Mode */}
                    <div className="text-center">
                        <button
                            onClick={toggleMode}
                            className="text-primary hover:text-primary/80 transition-smooth text-sm"
                        >
                            {isSignUp
                                ? 'Already have an account? Sign in'
                                : "Don't have an account? Sign up"}
                        </button>
                    </div>

                    {/* Go to Login Route */}
                    <div className="border-border mt-6 border-t pt-6">
                        <button
                            onClick={() => router.visit(route('login'))}
                            disabled={processing}
                            className="text-muted-foreground hover:text-foreground transition-smooth w-full text-sm disabled:opacity-50"
                        >
                            Login Page
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
