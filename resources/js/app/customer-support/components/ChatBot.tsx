import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your UpWearLane assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
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
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm processing your request. For more specific help, you can try asking about 'order status', 'returns', or 'sizing'.";
      
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('order')) {
        botResponse = "To check your order status, please provide your order ID (e.g., #UWL-12345). You can also find this in your dashboard.";
      } else if (lowerInput.includes('return')) {
        botResponse = "We offer a 30-day hassle-free return policy. Would you like to start a return process or view our return policy details?";
      } else if (lowerInput.includes('size') || lowerInput.includes('sizing')) {
        botResponse = "Our size guide is available on every product page. Most of our smart clothing runs true to size, but we recommend checking the specific measurements for tech-infused garments.";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Card className="flex flex-col h-[500px] border-primary/20 shadow-lg overflow-hidden flex-1">
      <CardHeader className="bg-primary text-primary-foreground py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="CpuChipIcon" className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg">AI Support Bot</CardTitle>
            <CardDescription className="text-white/70 text-xs">
              Powered by UpWearLane Intelligence
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30"
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
                  : 'bg-white border border-border rounded-tl-none shadow-sm'
              }`}
            >
              {msg.text}
              <div className={`text-[10px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-border rounded-2xl p-3 rounded-tl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 border-t bg-white gap-2">
        <Input 
          className="flex-1"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping}>
          <Icon name="PaperAirplaneIcon" className="w-5 h-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
