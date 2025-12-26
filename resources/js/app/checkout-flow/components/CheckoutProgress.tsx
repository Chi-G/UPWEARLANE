import Icon from '@/components/ui/AppIcon';

interface Step {
  id: string;
  label: string;
}

interface CheckoutProgressProps {
  currentStep: number;
  steps: Step[];
}

export default function CheckoutProgress({ currentStep, steps }: CheckoutProgressProps) {
  return (
    <div className="w-full bg-surface border-b border-border">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep; 
            const isLast = index === steps?.length - 1;

            return (
              <div key={step?.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-smooth ${
                      isCompleted
                        ? 'bg-primary border-primary'
                        : isCurrent
                        ? 'bg-background border-primary' :'bg-background border-border'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="CheckIcon" size={20} className="text-primary-foreground" />
                    ) : (
                      <span
                        className={`font-data text-sm md:text-base font-medium ${
                          isCurrent ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs md:text-sm font-medium text-center ${
                      isCurrent ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step?.label}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 h-0.5 mx-2 md:mx-4">
                    <div
                      className={`h-full transition-smooth ${
                        isCompleted ? 'bg-primary' : 'bg-border'
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
