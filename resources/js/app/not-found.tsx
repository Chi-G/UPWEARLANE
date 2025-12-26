import React from 'react';
import { router } from '@inertiajs/react';
import Icon from '@/components/ui/AppIcon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="relative inline-block">
          <h1 className="text-9xl font-heading font-black text-primary/10 select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Lost in Space?</h2>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed"> 
          The page you are looking for doesn't exist or has been moved. 
          Don't worry though, our navigation systems can get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-3 bg-surface hover:bg-accent text-foreground border border-border font-medium rounded-lg transition-smooth flex items-center justify-center gap-2"
          >
            <Icon name={"ArrowLeftIcon" as any} size={20} />
            Go Back
          </button>
          <button 
            onClick={() => router.visit('/')}
            className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg shadow-gold transition-smooth flex items-center justify-center gap-2"
          >
            <Icon name={"HomeIcon" as any} size={20} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}