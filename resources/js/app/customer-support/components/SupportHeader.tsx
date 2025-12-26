import Icon from '@/components/ui/AppIcon';

export default function SupportHeader() {
    return (
        <div className="relative overflow-hidden py-12 lg:py-20">
            {/* Background patterns */}
            <div className="bg-primary/5 absolute inset-0 -z-10" />
            <div className="absolute right-0 top-0 -z-10 opacity-10">
                <Icon
                    name="LifebuoyIcon"
                    size={300}
                    className="text-primary rotate-12"
                />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
                        <Icon name="InformationCircleIcon" size={16} />
                        Help Center
                    </div>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
                        Customer Support & <br />
                        <span className="text-primary">Troubleshooting</span>
                    </h1>
                    <p className="text-muted-foreground text-xl leading-relaxed">
                        Need help with your smart gear? Our dedicated support
                        team and AI assistant are available 24/7 to ensure your
                        experience with UpWearLane is seamless.
                    </p>
                </div>
            </div>
        </div>
    );
}
