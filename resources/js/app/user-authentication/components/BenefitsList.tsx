import Icon from '@/components/ui/AppIcon';
import { BenefitsListProps } from '@/types';
import PropTypes from 'prop-types';

export default function BenefitsList({ benefits }: BenefitsListProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-foreground text-lg font-semibold">
                Why Create an Account?
            </h3>
            <ul className="space-y-2">
                {benefits?.map((benefit) => (
                    <li key={benefit?.id} className="flex items-start gap-3">
                        <div className="bg-primary/10 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                            <Icon
                                name="CheckIcon"
                                size={14}
                                className="text-primary"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-foreground text-sm font-medium">
                                {benefit?.title}
                            </p>
                            <p className="text-muted-foreground line-clamp-2 text-xs">
                                {benefit?.description}
                            </p>
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
        }),
    )?.isRequired,
};
