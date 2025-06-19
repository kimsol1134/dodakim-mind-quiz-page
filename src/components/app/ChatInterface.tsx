
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '안녕하세요! 저는 도닥임이에요. 아버지로서의 마음을 편안하게 털어놓으세요. 제가 항상 들어드릴게요.',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // RAG 기반 응답 시뮬레이션
  const generateAIResponse = (userMessage: string): { content: string; sources?: string[] } => {
    const responses = [
      {
        keywords: ['아내', '싸움', '갈등', '부부'],
        content: '아이가 태어난 후에 아내분과의 다툼이 잦아져서 많이 속상하고 힘드시겠어요. 아이의 탄생은 축복이지만, 동시에 부부 관계에 큰 변화를 가져오는 시기이기도 해요. 많은 아빠들이 비슷한 감정을 느끼곤 합니다. 이는 결코 당신이 이상해서가 아니에요.',
        sources: ['산후 부부 갈등의 심리학', '아빠의 감정 변화 연구']
      },
      {
        keywords: ['힘들', '지친', '무력', '우울'],
        content: '정말 많이 지치고 힘드시겠어요. 아버지가 되는 것은 기쁜 일이지만, 동시에 큰 책임감과 스트레스를 동반하죠. 이런 감정을 느끼는 것은 자연스러운 일이에요. 혼자 감당하려 하지 마시고, 천천히 하나씩 해결해 나가면 됩니다.',
        sources: ['남성 산후우울증 이해하기', '아버지의 스트레스 관리법']
      },
      {
        keywords: ['아이', '육아', '잠', '울음'],
        content: '밤마다 깨는 아이 때문에 정말 힘들고 지치시겠어요. 신생아의 수면 패턴은 아직 정착되지 않아서 이런 일이 자주 일어납니다. 시간이 지나면서 점차 나아질 거예요. 가능할 때 낮잠을 자시거나, 가족의 도움을 받아 휴식을 취하시는 것이 중요해요.',
        sources: ['신생아 수면 패턴 이해', '아빠를 위한 육아 가이드']
      }
    ];

    for (const response of responses) {
      if (response.keywords.some(keyword => userMessage.includes(keyword))) {
        return { content: response.content, sources: response.sources };
      }
    }

    return {
      content: '말씀해 주신 내용을 듣고 있어요. 더 자세히 이야기해 주시면 더 나은 조언을 드릴 수 있을 것 같아요. 당신의 마음을 이해하고 함께 해결책을 찾아보고 싶어요.',
      sources: ['일반 상담 가이드라인']
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // AI 응답 시뮬레이션 (실제로는 RAG 파이프라인)
    setTimeout(() => {
      const { content, sources } = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content,
        sources,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-white'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div className={`rounded-lg p-4 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.sources && (
                      <div className="mt-2 pt-2 border-t border-white/20">
                        <p className="text-xs opacity-70">
                          출처: {message.sources.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-secondary text-white rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-6">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="마음 속 이야기를 편안하게 들려주세요..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
