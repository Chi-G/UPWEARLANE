import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
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

interface ChatBotProps {
    setting?: ChatbotSettingData;
    responses?: ChatbotResponseData[];
}

export default function ChatBot({ setting, responses }: ChatBotProps) {
    // Default values
    const botName = setting?.bot_name || 'AI Support Bot';
    const botSubtitle =
        setting?.bot_subtitle || 'Powered by UpWearLane Intelligence';
    const welcomeMessage =
        setting?.welcome_message ||
        "Hello! I'm your UpWearLane assistant. How can I help you today?";
    const defaultResponse =
        setting?.default_response ||
        "I'm processing your request. For more specific help, you can try asking about 'order status', 'returns', or 'sizing'.";
    const headerIcon = setting?.header_icon || 'CpuChipIcon';

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: welcomeMessage,
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Find matching response from database
        setTimeout(() => {
            let botResponse = defaultResponse;
            const lowerInput = input.toLowerCase();

            // Check if we have custom responses from database
            if (responses && responses.length > 0) {
                const matchedResponse = responses.find((r) =>
                    lowerInput.includes(r.keyword.toLowerCase())
                );
                if (matchedResponse) {
                    botResponse = matchedResponse.response;
                }
            } else {
                // Fallback to hardcoded logic if no database responses
                if (lowerInput.includes('order')) {
                    botResponse =
                        'To check your order status, please provide your order ID (e.g., #UWL-12345). You can also find this in your dashboard.';
                } else if (lowerInput.includes('return')) {
                    botResponse =
                        'We offer a 30-day hassle-free return policy. Would you like to start a return process or view our return policy details?';
                } else if (
                    lowerInput.includes('size') ||
                    lowerInput.includes('sizing')
                ) {
                    botResponse =
                        'Our size guide is available on every product page. Most of our smart clothing runs true to size, but we recommend checking the specific measurements for tech-infused garments.';
                }
            }

            const botMessage: Message = {
                id: Date.now() + 1,
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <Card className="border-primary/20 flex h-[500px] flex-1 flex-col overflow-hidden shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                        <Icon
                            name={headerIcon}
                            className="h-6 w-6 text-white"
                        />
                    </div>
                    <div>
                        <CardTitle className="text-lg">{botName}</CardTitle>
                        <CardDescription className="text-xs text-white/70">
                            {botSubtitle}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent
                className="bg-muted/30 flex-1 space-y-4 overflow-y-auto p-4"
                ref={scrollRef}
            >
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl p-3 text-sm ${
                                msg.sender === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                                    : 'bg-surface border-border rounded-tl-none border shadow-sm'
                            }`}
                        >
                            {msg.text}
                            <div
                                className={`mt-1 text-[10px] opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                            >
                                {msg.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </div>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-surface border-border rounded-2xl rounded-tl-none border p-3 shadow-sm">
                            <div className="flex gap-1">
                                <span
                                    className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"
                                    style={{ animationDelay: '0ms' }}
                                />
                                <span
                                    className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"
                                    style={{ animationDelay: '150ms' }}
                                />
                                <span
                                    className="bg-muted-foreground h-1.5 w-1.5 animate-bounce rounded-full"
                                    style={{ animationDelay: '300ms' }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter className="bg-card gap-2 border-t p-3">
                <Input
                    className="flex-1"
                    placeholder="Ask a question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                >
                    <Icon name="PaperAirplaneIcon" className="h-5 w-5" />
                </Button>
            </CardFooter>
        </Card>
    );
}
