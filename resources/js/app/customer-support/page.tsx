import Footer from '@/app/landing-page/components/Footer';
import Header from '@/components/common/Header';
import Icon from '@/components/ui/AppIcon';
import ChatBot from './components/ChatBot';
import FAQSection from './components/FAQSection';
import SupportHeader from './components/SupportHeader';
import WhatsAppChat from './components/WhatsAppChat';

interface SupportHeaderData {
    badge_icon: string;
    badge_text: string;
    title: string;
    subtitle?: string;
    description: string;
    background_pattern_icon: string;
}

interface WhatsAppChatData {
    title: string;
    description: string;
    phone_number: string;
    features: string[];
    button_text: string;
}

interface FaqData {
    id: number;
    question: string;
    answer: string;
}

interface ChatbotSettingData {
    bot_name: string;
    bot_subtitle: string;
    welcome_message: string;
    default_response: string;
    header_icon: string;
}

interface ChatbotResponseData {
    keyword: string;
    response: string;
}

interface CustomerSupportPageProps {
    supportHeader?: SupportHeaderData;
    whatsappChat?: WhatsAppChatData;
    faqs?: FaqData[];
    chatbotSetting?: ChatbotSettingData;
    chatbotResponses?: ChatbotResponseData[];
    footerData?: {
        companyDescription: string;
        socialLinks: { name: string; url: string; icon: string }[];
        quickLinks: { name: string; url: string }[];
        categories: { name: string; url: string }[];
        contact: { address: string; phone: string; email: string };
        trustBadges: string[];
        legalLinks: { name: string; url: string }[];
    };
}

export default function CustomerSupportPage({
    supportHeader,
    whatsappChat,
    faqs,
    chatbotSetting,
    chatbotResponses,
    footerData,
}: CustomerSupportPageProps) {
    return (
        <div className="bg-background flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 pt-16 lg:pt-20">
                <SupportHeader data={supportHeader} />

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="space-y-6 lg:col-span-1">
                            <WhatsAppChat data={whatsappChat} />

                            <div className="border-border bg-muted/20 rounded-xl border p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                                    <Icon
                                        name="PhoneIcon"
                                        className="text-primary h-5 w-5"
                                    />
                                    Direct Phone Support
                                </h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    Prefer a traditional phone call? Our
                                    specialists are available during business
                                    hours.
                                </p>
                                <a
                                    href="tel:+1555123TECH"
                                    className="text-primary flex items-center gap-1 font-semibold hover:underline"
                                >
                                    +1 (555) 123-TECH
                                </a>
                            </div>

                            <div className="border-border bg-muted/20 rounded-xl border p-6">
                                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                                    <Icon
                                        name="EnvelopeIcon"
                                        className="text-primary h-5 w-5"
                                    />
                                    Email Support
                                </h3>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    For complex technical queries or business
                                    inquiries.
                                </p>
                                <a
                                    href="mailto:support@upwearlane.com"
                                    className="text-primary flex items-center gap-1 font-semibold hover:underline"
                                >
                                    support@upwearlane.com
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                <h2 className="mb-2 text-2xl font-bold">
                                    Interactive AI Assistant
                                </h2>
                                <p className="text-muted-foreground">
                                    Quick answers for order status, returns, and
                                    tech setups.
                                </p>
                            </div>
                            <ChatBot
                                setting={chatbotSetting}
                                responses={chatbotResponses}
                            />
                        </div>
                    </div>

                    <div className="mx-auto max-w-4xl">
                        <FAQSection faqs={faqs} />
                    </div>
                </div>
            </main>

            {footerData && <Footer footerData={footerData} />}
        </div>
    );
}
