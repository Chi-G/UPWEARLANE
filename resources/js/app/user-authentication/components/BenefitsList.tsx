import Icon from '@/components/ui/AppIcon';
import PropTypes from 'prop-types';
import { BenefitsListProps } from '@/types';

export default function BenefitsList({ benefits }: BenefitsListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Why Create an Account?</h3>
      <ul className="space-y-2">
        {benefits?.map((benefit) => (
          <li key={benefit?.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-primary/10 rounded-full mt-0.5">
              <Icon name="CheckIcon" size={14} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{benefit?.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{benefit?.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

BenefitsList.propTypes = {
  benefits: PropTypes?.arrayOf(
    PropTypes?.shape({
      id: PropTypes?.number?.isRequired,
      title: PropTypes?.string?.isRequired,
      description: PropTypes?.string?.isRequired,
    })
  )?.isRequired,
};