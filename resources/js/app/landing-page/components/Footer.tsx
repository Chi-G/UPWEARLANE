import { Link } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';

import { FooterData } from '@/types';

export default function Footer({ footerData }: { footerData: FooterData }) {
  const currentYear = new Date()?.getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <svg
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M20 5L25 15H15L20 5Z"
                      fill="currentColor"
                      className="text-primary-foreground"
                    />
                    <path
                      d="M10 18L20 35L30 18H10Z"
                      fill="currentColor"
                      className="text-primary-foreground"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="3"
                      fill="currentColor"
                      className="text-primary-foreground"
                    />
                  </svg>
                </div>
                <span className="font-heading text-xl font-semibold">
                  UpWearLane
                </span>
              </div>
              <p className="text-secondary-foreground/80 leading-relaxed">
                {footerData?.companyDescription}
              </p>
              <div className="flex items-center space-x-4">
                {footerData?.socialLinks?.map((social: any) => (
                  <a
                    key={social?.name}
                    href={social?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary-foreground/10 hover:bg-primary text-secondary-foreground hover:text-primary-foreground rounded-lg flex items-center justify-center transition-smooth press-effect"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon name={social?.icon} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                {footerData?.quickLinks?.map((link: any) => (
                  <li key={link?.name}>
                    <Link
                      href={link?.url}
                      className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                    >
                      {link?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-semibold">Categories</h4>
              <ul className="space-y-3">
                {footerData?.categories?.map((category: any) => (
                  <li key={category?.name}>
                    <Link
                      href={category?.url}
                      className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                    >
                      {category?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="font-heading text-lg font-semibold">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPinIcon" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-secondary-foreground/80 text-sm leading-relaxed">
                    {footerData?.contact?.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="PhoneIcon" size={20} className="text-primary flex-shrink-0" />
                  <a
                    href={`tel:${footerData?.contact?.phone}`}
                    className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {footerData?.contact?.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="EnvelopeIcon" size={20} className="text-primary flex-shrink-0" />
                  <a
                    href={`mailto:${footerData?.contact?.email}`}
                    className="text-secondary-foreground/80 hover:text-primary transition-smooth"
                  >
                    {footerData?.contact?.email}
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <h5 className="font-medium text-sm">Secure & Trusted</h5>
                <div className="flex items-center space-x-3">
                  {footerData?.trustBadges?.map((badge: any, index: number) => (
                    <div
                      key={index}
                      className="bg-secondary-foreground/10 rounded-md px-2 py-1"
                    >
                      <span className="text-xs font-medium text-secondary-foreground/80">
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-secondary-foreground/20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-secondary-foreground/60">
              © {currentYear} UpWearLane. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              {footerData?.legalLinks?.map((link: any) => (
                <Link
                  key={link?.name}
                  href={link?.url}
                  className="text-sm text-secondary-foreground/60 hover:text-primary transition-smooth"
                >
                  {link?.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-secondary-foreground/60">
              <div className="flex items-center space-x-2">
                <Icon name="CurrencyDollarIcon" size={16} />
                <span>Multi-Currency</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TruckIcon" size={16} />
                <span>Global Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  footerData: PropTypes?.shape({
    companyDescription: PropTypes?.string?.isRequired,
    socialLinks: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired,
        icon: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    quickLinks: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    categories: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
    contact: PropTypes?.shape({
      address: PropTypes?.string?.isRequired,
      phone: PropTypes?.string?.isRequired,
      email: PropTypes?.string?.isRequired,
    })?.isRequired,
    trustBadges: PropTypes?.arrayOf(PropTypes?.string)?.isRequired,
    legalLinks: PropTypes?.arrayOf(
      PropTypes?.shape({
        name: PropTypes?.string?.isRequired,
        url: PropTypes?.string?.isRequired,
      })
    )?.isRequired,
  })?.isRequired,
};