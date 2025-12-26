import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/AppIcon';

const faqs = [
    {
        question: 'How do I track my order?',
        answer: "You can track your order by logging into your account and visiting the 'Orders' section in your dashboard. Once your order ships, you'll also receive an email with a tracking link.",
    },
    {
        question: 'What is your return policy for tech-infused clothing?',
        answer: 'We offer a 30-day return policy for all items, including tech-infused clothing. The items must be in original condition with all tags and tech components (if detachable) included. Please follow the care instructions included with the garment to ensure it remains eligible for return.',
    },
    {
        question: 'How do I update the firmware on my wearable devices?',
        answer: "Most devices update automatically through our mobile app. Ensure your device is paired with the app and has at least 50% battery. If a manual update is available, you'll see a notification in the 'Device Settings' section of the app.",
    },
    {
        question: 'Are smart fabrics machine washable?',
        answer: 'Many of our smart fabrics are machine washable, but some require specific care. Always check the internal tag for care instructions. For garments with integrated sensors, we typically recommend a cold, gentle cycle and air drying to preserve the sensor longevity.',
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to over 25 countries worldwide. Shipping times and costs vary depending on the destination. You can view the estimated shipping cost and time during the checkout process.',
    },
];

export default function FAQSection() {
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
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
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
