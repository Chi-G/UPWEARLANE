import Icon from '@/components/ui/AppIcon';
import { AuthenticationFormData, AuthenticationFormProps } from '@/types';
import PropTypes from 'prop-types';
import { ChangeEvent, FormEvent, useState } from 'react';

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
}

export default function AuthenticationForm({
    isSignUp,
    onSubmit,
    isLoading,
}: AuthenticationFormProps) {
    const [formData, setFormData] = useState<AuthenticationFormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};

        if (isSignUp && !formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        if (isSignUp) {
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }

            if (!formData.acceptTerms) {
                newErrors.acceptTerms =
                    'You must accept the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
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
                        value={formData?.name}
                        onChange={handleInputChange}
                        className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                            errors?.name
                                ? 'border-destructive'
                                : 'border-border'
                        }`}
                        placeholder="John Doe"
                        disabled={isLoading}
                    />
                    {errors?.name && (
                        <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                            <Icon name="ExclamationCircleIcon" size={16} />
                            {errors?.name}
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
                    value={formData?.email}
                    onChange={handleInputChange}
                    className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                        errors?.email ? 'border-destructive' : 'border-border'
                    }`}
                    placeholder="you@example.com"
                    disabled={isLoading}
                />
                {errors?.email && (
                    <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                        <Icon name="ExclamationCircleIcon" size={16} />
                        {errors?.email}
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
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData?.password}
                    onChange={handleInputChange}
                    className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                        errors?.password
                            ? 'border-destructive'
                            : 'border-border'
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                />
                {errors?.password && (
                    <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                        <Icon name="ExclamationCircleIcon" size={16} />
                        {errors?.password}
                    </p>
                )}
            </div>
            {isSignUp && (
                <>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="text-foreground mb-2 block text-sm font-medium"
                        >
                            Confirm Password{' '}
                            <span className="text-destructive">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData?.confirmPassword}
                            onChange={handleInputChange}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                errors?.confirmPassword
                                    ? 'border-destructive'
                                    : 'border-border'
                            }`}
                            placeholder="••••••••"
                            disabled={isLoading}
                        />
                        {errors?.confirmPassword && (
                            <p className="text-destructive mt-1 flex items-center gap-1 text-sm">
                                <Icon name="ExclamationCircleIcon" size={16} />
                                {errors?.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={formData?.acceptTerms}
                            onChange={handleInputChange}
                            className="border-border text-primary focus:ring-primary mt-1 h-4 w-4 rounded focus:ring-offset-0"
                            disabled={isLoading}
                        />
                        <label
                            htmlFor="acceptTerms"
                            className="text-foreground text-sm"
                        >
                            I accept the{' '}
                            <a
                                href="#"
                                className="text-primary hover:text-primary/80 transition-smooth"
                            >
                                Terms and Conditions
                            </a>{' '}
                            and{' '}
                            <a
                                href="#"
                                className="text-primary hover:text-primary/80 transition-smooth"
                            >
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    {errors?.acceptTerms && (
                        <p className="text-destructive flex items-center gap-1 text-sm">
                            <Icon name="ExclamationCircleIcon" size={16} />
                            {errors?.acceptTerms}
                        </p>
                    )}
                </>
            )}
            <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 w-full rounded-lg px-8 font-medium disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Icon
                            name="ArrowPathIcon"
                            size={20}
                            className="animate-spin"
                        />
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
    isSignUp: PropTypes?.bool?.isRequired,
    onSubmit: PropTypes?.func?.isRequired,
    isLoading: PropTypes?.bool?.isRequired,
};
