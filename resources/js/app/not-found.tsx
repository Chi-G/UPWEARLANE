import Icon from '@/components/ui/AppIcon';
import { router } from '@inertiajs/react';

export default function NotFound() {
    return (
        <div className="bg-background flex min-h-screen items-center justify-center px-4">
            <div className="max-w-lg space-y-8 text-center">
                <div className="relative inline-block">
                    <h1 className="font-heading text-primary/10 select-none text-9xl font-black">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="font-heading text-foreground text-4xl font-bold md:text-5xl">
                            Lost in Space?
                        </h2>
                    </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed">
                    The page you are looking for doesn't exist or has been
                    moved. Don't worry though, our navigation systems can get
                    you back on track.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                        onClick={() => window.history.back()}
                        className="bg-surface hover:bg-accent text-foreground border-border transition-smooth flex w-full items-center justify-center gap-2 rounded-lg border px-8 py-3 font-medium sm:w-auto"
                    >
                        <Icon name={'ArrowLeftIcon' as any} size={20} />
                        Go Back
                    </button>
                    <button
                        onClick={() => router.visit('/')}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold transition-smooth flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3 font-medium sm:w-auto"
                    >
                        <Icon name={'HomeIcon' as any} size={20} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
