import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/app/landing-page/components/Footer';
import SupportHeader from './components/SupportHeader';
import WhatsAppChat from './components/WhatsAppChat';
import ChatBot from './components/ChatBot';
import FAQSection from './components/FAQSection';
import Icon from '@/components/ui/AppIcon';

// Mock footer data if needed, or we can use the one from landing-page context
const footerData = {
  companyDescription: "UpWearLane is the premier destination for cutting-edge wearable technology and smart fashion. We blend innovation with style to create the future of fashion.",
  socialLinks: [
    { name: "Facebook", url: "https://facebook.com/upwearlane", icon: "Facebook" },
    { name: "Twitter", url: "https://twitter.com/upwearlane", icon: "Twitter" },
    { name: "Instagram", url: "https://instagram.com/upwearlane", icon: "Instagram" },
    { name: "LinkedIn", url: "https://linkedin.com/company/upwearlane", icon: "Linkedin" }
  ],
  quickLinks: [
    { name: "About Us", url: "/about" },
    { name: "Product Catalog", url: "/product-catalog" },
    { name: "Size Guide", url: "/size-guide" },
    { name: "Shipping Info", url: "/shipping" },
    { name: "Returns", url: "/returns" },
    { name: "Support", url: "/support" }
  ],
  categories: [
    { name: "Smart Watches", url: "/product-catalog?category=smartwatches" },
    { name: "Fitness Trackers", url: "/product-catalog?category=fitness" },
    { name: "Smart Clothing", url: "/product-catalog?category=clothing" },
    { name: "Tech Accessories", url: "/product-catalog?category=accessories" },
    { name: "AR/VR Gear", url: "/product-catalog?category=arvr" },
    { name: "New Arrivals", url: "/product-catalog?filter=new" }
  ],
  contact: {
    address: "Abuja, Nigeria",
    phone: "+234 7065910449",
    email: "info@upwearlane.com"
  },
  trustBadges: ["SSL Secure", "PCI Compliant", "30-Day Returns", "Global Shipping"],
  legalLinks: [
    { name: "Privacy Policy", url: "/privacy" },
    { name: "Terms of Service", url: "/terms" },
    { name: "Cookie Policy", url: "/cookies" }
  ]
};

export default function CustomerSupportPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16 lg:pt-20">
        <SupportHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1 space-y-6">
              <WhatsAppChat />
              
              <div className="p-6 border border-border rounded-xl bg-muted/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="PhoneIcon" className="w-5 h-5 text-primary" />
                  Direct Phone Support
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prefer a traditional phone call? Our specialists are available during business hours.
                </p>
                <a 
                  href="tel:+1555123TECH" 
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  +1 (555) 123-TECH
                </a>
              </div>

              <div className="p-6 border border-border rounded-xl bg-muted/20">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Icon name="EnvelopeIcon" className="w-5 h-5 text-primary" />
                  Email Support
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  For complex technical queries or business inquiries.
                </p>
                <a 
                  href="mailto:support@upwearlane.com" 
                  className="text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  support@upwearlane.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Interactive AI Assistant</h2>
                <p className="text-muted-foreground">
                  Quick answers for order status, returns, and tech setups.
                </p>
              </div>
              <ChatBot />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <FAQSection />
          </div>
        </div>
      </main>

      <Footer footerData={footerData} />
    </div>
  );
}
