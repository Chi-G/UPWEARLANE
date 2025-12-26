import Icon from '@/components/ui/AppIcon';

interface Step {
    id: string;
    label: string;
}

interface CheckoutProgressProps {
    currentStep: number;
    steps: Step[];
}

export default function CheckoutProgress({
    currentStep,
    steps,
}: CheckoutProgressProps) {
    return (
        <div className="bg-surface border-border w-full border-b">
            <div className="mx-auto max-w-4xl px-4 py-6 md:px-6 md:py-8 lg:px-8">
                <div className="flex items-center justify-between">
                    {steps?.map((step, index) => {
                        const isCompleted = index < currentStep;
                        const isCurrent = index === currentStep;
                        const isLast = index === steps?.length - 1;

                        return (
                            <div
                                key={step?.id}
                                className="flex flex-1 items-center"
                            >
                                <div className="flex flex-1 flex-col items-center">
                                    <div
                                        className={`transition-smooth flex h-10 w-10 items-center justify-center rounded-full border-2 md:h-12 md:w-12 ${
                                            isCompleted
                                                ? 'bg-primary border-primary'
                                                : isCurrent
                                                  ? 'bg-background border-primary'
                                                  : 'bg-background border-border'
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <Icon
                                                name="CheckIcon"
                                                size={20}
                                                className="text-primary-foreground"
                                            />
                                        ) : (
                                            <span
                                                className={`font-data text-sm font-medium md:text-base ${
                                                    isCurrent
                                                        ? 'text-primary'
                                                        : 'text-muted-foreground'
                                                }`}
                                            >
                                                {index + 1}
                                            </span>
                                        )}
                                    </div>
                                    <span
                                        className={`mt-2 text-center text-xs font-medium md:text-sm ${
                                            isCurrent
                                                ? 'text-foreground'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {step?.label}
                                    </span>
                                </div>
                                {!isLast && (
                                    <div className="mx-2 h-0.5 flex-1 md:mx-4">
                                        <div
                                            className={`transition-smooth h-full ${
                                                isCompleted
                                                    ? 'bg-primary'
                                                    : 'bg-border'
                                            }`}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
