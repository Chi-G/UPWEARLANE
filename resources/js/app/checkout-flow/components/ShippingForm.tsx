import Icon from '@/components/ui/AppIcon';
import { ShippingAddress, ShippingFormProps } from '@/types';
import { useState } from 'react';

const COUNTRIES = [
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
];

export default function ShippingForm({
    onShippingComplete,
    initialData,
}: ShippingFormProps) {
    const [formData, setFormData] = useState({
        fullName: initialData?.fullName || '',
        email: initialData?.email || '',
        phone: initialData?.phone || '',
        address: initialData?.address || '',
        city: initialData?.city || '',
        state: initialData?.state || '',
        postalCode: initialData?.postalCode || '',
        country: initialData?.country || 'NG',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: keyof ShippingAddress, value: string) => {
        switch (name) {
            case 'fullName':
                return value.trim().length < 2
                    ? 'Full name must be at least 2 characters'
                    : '';
            case 'email':
                return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? 'Invalid email address'
                    : '';
            case 'phone':
                return value.trim().length < 10 ? 'Invalid phone number' : '';
            case 'address':
                return value.trim().length < 5
                    ? 'Address must be at least 5 characters'
                    : '';
            case 'city':
                return value.trim().length < 2 ? 'City is required' : '';
            case 'state':
                return value.trim().length < 2
                    ? 'State/Province is required'
                    : '';
            case 'postalCode':
                return value.trim().length < 3 ? 'Invalid postal code' : '';
            default:
                return '';
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched?.[name]) {
            const error = validateField(name as keyof ShippingAddress, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (
        e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name as keyof ShippingAddress, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();

        const newErrors: Record<string, string> = {};
        Object.keys(formData)?.forEach((key) => {
            const error = validateField(
                key as keyof ShippingAddress,
                formData?.[key as keyof ShippingAddress],
            );
            if (error) newErrors[key] = error;
        });

        setErrors(newErrors);
        setTouched(
            Object.keys(formData)?.reduce(
                (acc, key) => ({ ...acc, [key]: true }),
                {},
            ),
        );

        if (Object.keys(newErrors)?.length === 0) {
            onShippingComplete(formData);
        }
    };

    // `selectedCountry` removed because it wasn't used. Keep formData.country for selection.

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-heading text-foreground text-lg font-semibold md:text-xl">
                    Shipping Address
                </h3>

                <div>
                    <label
                        htmlFor="fullName"
                        className="text-foreground mb-2 block text-sm font-medium"
                    >
                        Full Name *
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData?.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                            errors?.fullName && touched?.fullName
                                ? 'border-error'
                                : 'border-border'
                        }`}
                        placeholder="John Doe"
                    />
                    {errors?.fullName && touched?.fullName && (
                        <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                            <Icon name="ExclamationCircleIcon" size={14} />
                            <span>{errors?.fullName}</span>
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-foreground mb-2 block text-sm font-medium"
                        >
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData?.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                errors?.email && touched?.email
                                    ? 'border-error'
                                    : 'border-border'
                            }`}
                            placeholder="you@example.com"
                        />
                        {errors?.email && touched?.email && (
                            <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                                <Icon name="ExclamationCircleIcon" size={14} />
                                <span>{errors?.email}</span>
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="phone"
                            className="text-foreground mb-2 block text-sm font-medium"
                        >
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData?.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                errors?.phone && touched?.phone
                                    ? 'border-error'
                                    : 'border-border'
                            }`}
                            placeholder="+1 (555) 000-0000"
                        />
                        {errors?.phone && touched?.phone && (
                            <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                                <Icon name="ExclamationCircleIcon" size={14} />
                                <span>{errors?.phone}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="address"
                        className="text-foreground mb-2 block text-sm font-medium"
                    >
                        Street Address *
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData?.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                            errors?.address && touched?.address
                                ? 'border-error'
                                : 'border-border'
                        }`}
                        placeholder="123 Main Street, Apt 4B"
                    />
                    {errors?.address && touched?.address && (
                        <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                            <Icon name="ExclamationCircleIcon" size={14} />
                            <span>{errors?.address}</span>
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label
                            htmlFor="city"
                            className="text-foreground mb-2 block text-sm font-medium"
                        >
                            City *
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData?.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                errors?.city && touched?.city
                                    ? 'border-error'
                                    : 'border-border'
                            }`}
                            placeholder="Lagos"
                        />
                        {errors?.city && touched?.city && (
                            <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                                <Icon name="ExclamationCircleIcon" size={14} />
                                <span>{errors?.city}</span>
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="state"
                            className="text-foreground mb-2 block text-sm font-medium"
                        >
                            State/Province *
                        </label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData?.state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                errors?.state && touched?.state
                                    ? 'border-error'
                                    : 'border-border'
                            }`}
                            placeholder="Lagos State"
                        />
                        {errors?.state && touched?.state && (
                            <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                                <Icon name="ExclamationCircleIcon" size={14} />
                                <span>{errors?.state}</span>
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="postalCode"
                            className="text-foreground mb-2 block text-sm font-medium"
                        >
                            Postal Code *
                        </label>
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={formData?.postalCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                errors?.postalCode && touched?.postalCode
                                    ? 'border-error'
                                    : 'border-border'
                            }`}
                            placeholder="100001"
                        />
                        {errors?.postalCode && touched?.postalCode && (
                            <p className="text-error mt-1 flex items-center space-x-1 text-xs">
                                <Icon name="ExclamationCircleIcon" size={14} />
                                <span>{errors?.postalCode}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="country"
                        className="text-foreground mb-2 block text-sm font-medium"
                    >
                        Country *
                    </label>
                    <div className="relative">
                        <select
                            id="country"
                            name="country"
                            value={formData?.country}
                            onChange={handleChange}
                            className="bg-input border-border text-foreground focus-ring transition-smooth h-12 w-full appearance-none rounded-lg border pl-4 pr-10"
                        >
                            {COUNTRIES?.map((country) => (
                                <option
                                    key={country?.code}
                                    value={country?.code}
                                >
                                    {country?.flag} {country?.name}
                                </option>
                            ))}
                        </select>
                        <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className="text-muted-foreground pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                        />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 w-full rounded-lg px-8 font-medium"
            >
                Continue to Shipping Options
            </button>
        </form>
    );
}
