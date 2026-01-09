import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/AppIcon';

interface FaqData {
    id: number;
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs?: FaqData[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
    // Default FAQs if none provided
    const defaultFaqs = [
        {
            id: 1,
            question: 'How do I track my order?',
            answer: "You can track your order by logging into your account and visiting the 'Orders' section in your dashboard. Once your order ships, you'll also receive an email with a tracking link.",
        },
        {
            id: 2,
            question: 'What is your return policy for tech-infused clothing?',
            answer: 'We offer a 30-day return policy for all items, including tech-infused clothing. The items must be in original condition with all tags and tech components (if detachable) included. Please follow the care instructions included with the garment to ensure it remains eligible for return.',
        },
    ];

    const faqList = faqs && faqs.length > 0 ? faqs : defaultFaqs;

    return (
        <div className="py-12">
            <div className="mb-8 flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                    <Icon
                        name="QuestionMarkCircleIcon"
                        className="text-primary h-6 w-6"
                    />
                </div>
                <h2 className="text-2xl font-bold">
                    Frequently Asked Questions
                </h2>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqList.map((faq) => (
                    <AccordionItem
                        key={faq.id}
                        value={`item-${faq.id}`}
                        className="bg-surface rounded-xl border px-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
                    >
                        <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
