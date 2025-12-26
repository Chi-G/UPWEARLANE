import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function SupportHeader() {
  return (
    <div className="relative py-12 lg:py-20 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 bg-primary/5" />
      <div className="absolute top-0 right-0 -z-10 opacity-10">
        <Icon name="LifebuoyIcon" size={300} className="text-primary rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Icon name="InformationCircleIcon" size={16} />
            Help Center
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Customer Support & <br />
            <span className="text-primary">Troubleshooting</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Need help with your smart gear? Our dedicated support team and AI assistant 
            are available 24/7 to ensure your experience with UpWearLane is seamless.
          </p>
        </div>
      </div>
    </div>
  );
}
