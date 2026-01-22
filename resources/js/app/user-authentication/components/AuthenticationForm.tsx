import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useState } from 'react';

interface AuthenticationFormProps {
    isSignUp: boolean;
    data: {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        acceptTerms: boolean;
        remember: boolean;
    };
    setData: (field: string, value: string | boolean) => void;
    errors: Partial<Record<keyof AuthenticationFormProps['data'], string>>;
    processing: boolean;
    onSubmit: () => void;
}

export default function AuthenticationForm({
    isSignUp,
    data,
    setData,
    errors,
    processing,
    onSubmit,
}: AuthenticationFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
                <div>
                    <label
                        htmlFor="name"
                        className="text-foreground mb-2 block text-sm font-medium"
                    >
                        Full Name <span className="text-destructive">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${errors.name ? 'border-destructive' : 'border-border'
                            }`}
                        placeholder="John Doe"
                        disabled={processing}
                        required={isSignUp}
                    />
                    {errors.name && (
                        <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                            <Icon name="ExclamationCircleIcon" size={16} />
                            {errors.name}
                        </p>
                    )}
                </div>
            )}
            <div>
                <label
                    htmlFor="email"
                    className="text-foreground mb-2 block text-sm font-medium"
                >
                    Email Address <span className="text-destructive">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleInputChange}
                    className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${errors.email ? 'border-destructive' : 'border-border'
                        }`}
                    placeholder="you@example.com"
                    disabled={processing}
                    required
                />
                {errors.email && (
                    <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                        <Icon name="ExclamationCircleIcon" size={16} />
                        {errors.email}
                    </p>
                )}
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="text-foreground mb-2 block text-sm font-medium"
                >
                    Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 pr-12 ${errors.password ? 'border-destructive' : 'border-border'
                            }`}
                        placeholder="••••••••"
                        disabled={processing}
                        required
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
                    <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                        <Icon name="ExclamationCircleIcon" size={16} />
                        {errors.password}
                    </p>
                )}
            </div>

            {isSignUp && (
                <div>
                    <label
                        htmlFor="password_confirmation"
                        className="text-foreground mb-2 block text-sm font-medium"
                    >
                        Confirm Password <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleInputChange}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 pr-12 ${errors.password_confirmation
                                ? 'border-destructive'
                                : 'border-border'
                                }`}
                            placeholder="••••••••"
                            disabled={processing}
                            required={isSignUp}
                        />
                        <button
                            title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="text-muted-foreground hover:text-foreground absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                            tabIndex={-1}
                        >
                            <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={20} />
                        </button>
                    </div>
                    {errors.password_confirmation && (
                        <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                            <Icon name="ExclamationCircleIcon" size={16} />
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>
            )}

            <div className="flex items-center justify-between">
                {isSignUp ? (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={data.acceptTerms}
                            onChange={handleInputChange}
                            className="border-input text-primary focus:ring-primary h-4 w-4 rounded"
                            disabled={processing}
                        />
                        <label
                            htmlFor="acceptTerms"
                            className="text-muted-foreground ml-2 block text-sm"
                        >
                            <span>
                                I agree to the{' '}
                                <a
                                    href="/terms"
                                    className="text-primary hover:underline"
                                >
                                    Terms
                                </a>{' '}
                                and{' '}
                                <a
                                    href="/privacy"
                                    className="text-primary hover:underline"
                                >
                                    Privacy Policy
                                </a>
                            </span>
                        </label>
                    </div>
                ) : (
                    <div className="flex w-full justify-end">
                        <a
                            href={route('password.request')}
                            className="text-primary hover:text-primary/90 text-sm font-medium hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>
                )}
            </div>



            {/* Show acceptTerms error if present */}
            {isSignUp && errors.acceptTerms && (
                <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                    <Icon name="ExclamationCircleIcon" size={16} />
                    {errors.acceptTerms}
                </p>
            )}


            <button
                type="submit"
                disabled={processing}
                className="bg-primary hover:bg-primary/90 text-primary-foreground focus-ring transition-smooth relative flex w-full justify-center rounded-lg px-4 py-3 text-sm font-semibold disabled:opacity-70"
            >
                {processing ? (
                    <span className="flex items-center gap-2">
                        <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Processing...
                    </span>
                ) : isSignUp ? (
                    'Create Account'
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    );
}

AuthenticationForm.propTypes = {
    isSignUp: PropTypes.bool,
    data: PropTypes.object,
    setData: PropTypes.func,
    errors: PropTypes.object,
    processing: PropTypes.bool,
    onSubmit: PropTypes.func,
};
