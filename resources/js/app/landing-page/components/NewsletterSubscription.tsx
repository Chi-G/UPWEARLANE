'use client';

import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { NewsletterData } from '@/types';

export default function NewsletterSubscription({
    newsletterData,
}: {
    newsletterData: NewsletterData;
}) {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setError('');
        setIsLoading(true);

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex?.test(email)) {
            setError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Store subscription in localStorage
            const existingSubscriptions = JSON.parse(
                localStorage.getItem('newsletter_subscriptions') || '[]',
            );
            if (!existingSubscriptions?.includes(email)) {
                existingSubscriptions?.push(email);
                localStorage.setItem(
                    'newsletter_subscriptions',
                    JSON.stringify(existingSubscriptions),
                );
            }

            setIsSubscribed(true);
            setEmail('');
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e?.target?.value);
        if (error) setError('');
    };

    if (isSubscribed) {
        return (
            <section className="from-primary/5 via-background to-accent/5 bg-gradient-to-br py-12 md:py-16 lg:py-20">
                <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
                    <div className="bg-card border-border shadow-gold-lg rounded-2xl border p-8 md:p-12">
                        <div className="bg-success/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                            <Icon
                                name="CheckCircleIcon"
                                size={32}
                                className="text-success"
                            />
                        </div>
                        <h3 className="font-heading text-foreground mb-4 text-2xl font-bold md:text-3xl">
                            Welcome to the Future!
                        </h3>
                        <p className="text-muted-foreground mb-6 text-lg">
                            You're now subscribed to our newsletter. Get ready
                            for exclusive tech fashion updates, early access to
                            new arrivals, and special member-only deals.
                        </p>
                        <div className="text-muted-foreground flex items-center justify-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <Icon
                                    name="SparklesIcon"
                                    size={16}
                                    className="text-primary"
                                />
                                <span>Exclusive Deals</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon
                                    name="BoltIcon"
                                    size={16}
                                    className="text-primary"
                                />
                                <span>Early Access</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Icon
                                    name="GiftIcon"
                                    size={16}
                                    className="text-primary"
                                />
                                <span>Special Offers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="from-primary/5 via-background to-accent/5 bg-gradient-to-br py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
                <div className="bg-card border-border shadow-gold-lg overflow-hidden rounded-2xl border">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Content */}
                        <div className="flex flex-col justify-center p-8 md:p-12">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-heading text-foreground mb-4 text-3xl font-bold md:text-4xl">
                                        {newsletterData?.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">
                                        {newsletterData?.description}
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-3">
                                    {newsletterData?.benefits?.map(
                                        (benefit, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center space-x-3"
                                            >
                                                <div className="bg-primary/10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                                                    <Icon
                                                        name="CheckIcon"
                                                        size={14}
                                                        className="text-primary"
                                                    />
                                                </div>
                                                <span className="text-foreground">
                                                    {benefit}
                                                </span>
                                            </div>
                                        ),
                                    )}
                                </div>

                                {/* Subscription Form */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <div className="flex-1">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                placeholder="Enter your email address"
                                                required
                                                disabled={isLoading}
                                                className={`bg-input text-foreground placeholder:text-muted-foreground focus-ring transition-smooth h-12 w-full rounded-lg border px-4 ${
                                                    error
                                                        ? 'border-destructive'
                                                        : 'border-border'
                                                } disabled:cursor-not-allowed disabled:opacity-50`}
                                            />
                                            {error && (
                                                <p className="text-destructive mt-2 flex items-center text-sm">
                                                    <Icon
                                                        name="ExclamationTriangleIcon"
                                                        size={16}
                                                        className="mr-1"
                                                    />
                                                    {error}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isLoading || !email}
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth press-effect h-12 rounded-lg px-8 font-medium disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center">
                                                    <Icon
                                                        name="ArrowPathIcon"
                                                        size={20}
                                                        className="mr-2 animate-spin"
                                                    />
                                                    Subscribing...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <Icon
                                                        name="PaperAirplaneIcon"
                                                        size={20}
                                                        className="mr-2"
                                                    />
                                                    Subscribe
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>

                                {/* Privacy Note */}
                                <p className="text-muted-foreground text-xs">
                                    By subscribing, you agree to our Privacy
                                    Policy and consent to receive updates from
                                    our company.
                                </p>
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="from-primary/10 to-accent/10 flex items-center justify-center bg-gradient-to-br p-8 md:p-12">
                            <div className="space-y-6 text-center">
                                <div className="bg-primary/20 mx-auto flex h-24 w-24 items-center justify-center rounded-full">
                                    <Icon
                                        name="EnvelopeIcon"
                                        size={48}
                                        className="text-primary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-heading text-foreground text-2xl font-bold">
                                        {newsletterData?.subscriberCount}+
                                    </div>
                                    <div className="text-muted-foreground">
                                        Tech enthusiasts already subscribed
                                    </div>
                                </div>
                                <div className="text-muted-foreground flex items-center justify-center space-x-4 text-sm">
                                    <div className="flex items-center space-x-1">
                                        <Icon name="ClockIcon" size={16} />
                                        <span>Weekly updates</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Icon
                                            name="ShieldCheckIcon"
                                            size={16}
                                        />
                                        <span>No spam</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

NewsletterSubscription.propTypes = {
    newsletterData: PropTypes?.shape({
        title: PropTypes?.string?.isRequired,
        description: PropTypes?.string?.isRequired,
        benefits: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
        subscriberCount: PropTypes?.string?.isRequired,
    })?.isRequired,
};
