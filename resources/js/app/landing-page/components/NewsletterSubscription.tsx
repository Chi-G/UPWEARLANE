'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

import { NewsletterData } from '@/types';

export default function NewsletterSubscription({ newsletterData }: { newsletterData: NewsletterData }) {
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store subscription in localStorage
      const existingSubscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      if (!existingSubscriptions?.includes(email)) {
        existingSubscriptions?.push(email);
        localStorage.setItem('newsletter_subscriptions', JSON.stringify(existingSubscriptions));
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
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-gold-lg">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircleIcon" size={32} className="text-success" />
            </div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
              Welcome to the Future!
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              You're now subscribed to our newsletter. Get ready for exclusive tech fashion updates, early access to new arrivals, and special member-only deals.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="SparklesIcon" size={16} className="text-primary" />
                <span>Exclusive Deals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="BoltIcon" size={16} className="text-primary" />
                <span>Early Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="GiftIcon" size={16} className="text-primary" />
                <span>Special Offers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-gold-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                    {newsletterData?.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {newsletterData?.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  {newsletterData?.benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="CheckIcon" size={14} className="text-primary" />
                      </div>
                      <span className="text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Subscription Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email address"
                        required
                        disabled={isLoading}
                        className={`w-full h-12 px-4 bg-input border rounded-lg text-foreground placeholder:text-muted-foreground focus-ring transition-smooth ${
                          error ? 'border-destructive' : 'border-border'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      />
                      {error && (
                        <p className="text-sm text-destructive mt-2 flex items-center">
                          <Icon name="ExclamationTriangleIcon" size={16} className="mr-1" />
                          {error}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth press-effect disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <Icon name="ArrowPathIcon" size={20} className="mr-2 animate-spin" />
                          Subscribing...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Icon name="PaperAirplaneIcon" size={20} className="mr-2" />
                          Subscribe
                        </span>
                      )}
                    </button>
                  </div>
                </form>

                {/* Privacy Note */}
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
              </div>
            </div>

            {/* Visual */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 md:p-12 flex items-center justify-center">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="EnvelopeIcon" size={48} className="text-primary" />
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-heading font-bold text-foreground">
                    {newsletterData?.subscriberCount}+
                  </div>
                  <div className="text-muted-foreground">
                    Tech enthusiasts already subscribed
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="ClockIcon" size={16} />
                    <span>Weekly updates</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ShieldCheckIcon" size={16} />
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