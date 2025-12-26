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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 md:p-6 bg-surface rounded-lg border border-border">
      {badges?.map((badge) => (
        <div key={badge?.text} className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/10 rounded-lg">
            <Icon name={badge?.icon} size={20} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{badge?.text}</p>
            <p className="text-xs text-muted-foreground truncate">{badge?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}