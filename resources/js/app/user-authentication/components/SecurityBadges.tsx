import Icon from '@/components/ui/AppIcon';

export default function SecurityBadges() {
    const badges = [
        {
            icon: 'ShieldCheckIcon',
            text: 'SSL Secured',
            description: '256-bit encryption',
        },
        {
            icon: 'LockClosedIcon',
            text: 'PCI Compliant',
            description: 'Payment security',
        },
        {
            icon: 'CheckBadgeIcon',
            text: 'Verified',
            description: 'Trusted platform',
        },
    ] as const;

    return (
        <div className="bg-surface border-border grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-3 md:p-6">
            {badges?.map((badge) => (
                <div key={badge?.text} className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                        <Icon
                            name={badge?.icon}
                            size={20}
                            className="text-primary"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="text-foreground truncate text-sm font-medium">
                            {badge?.text}
                        </p>
                        <p className="text-muted-foreground truncate text-xs">
                            {badge?.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
