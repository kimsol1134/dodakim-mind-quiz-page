import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { analyzeEmotion, getCBTQuestion } from '@/utils/cbtQuestions';
import EmotionTags from './EmotionTags';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: string[];
  emotions?: string[];
  stressors?: string[];
  isCBTQuestion?: boolean;
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
  const [currentMessageEmotions, setCurrentMessageEmotions] = useState<string[]>([]);
  const [currentMessageStressors, setCurrentMessageStressors] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 기존 RAG 기반 응답 함수
  const generateAIResponse = (userMessage: string): { content: string; sources?: string[] } => {
    const responses = [
      {
        keywords: ['아내', '싸움', '갈등', '부부', '배우자'],
        content: '아이가 태어난 후에 아내분과의 다툼이 잦아져서 많이 속상하고 힘드시겠어요. 아이의 탄생은 축복이지만, 동시에 부부 관계에 큰 변화를 가져오는 시기이기도 해요. 많은 아빠들이 비슷한 감정을 느끼곤 합니다. 이는 결코 당신이 이상해서가 아니에요.',
        sources: ['산후 부부 갈등의 심리학', '아빠의 감정 변화 연구']
      },
      {
        keywords: ['힘들', '지친', '무력', '우울', '슬픈'],
        content: '정말 많이 지치고 힘드시겠어요. 아버지가 되는 것은 기쁜 일이지만, 동시에 큰 책임감과 스트레스를 동반하죠. 이런 감정을 느끼는 것은 자연스러운 일이에요. 혼자 감당하려 하지 마시고, 천천히 하나씩 해결해 나가면 됩니다.',
        sources: ['남성 산후우울증 이해하기', '아버지의 스트레스 관리법']
      },
      {
        keywords: ['아이', '육아', '잠', '울음', '기저귀'],
        content: '밤마다 깨는 아이 때문에 정말 힘들고 지치시겠어요. 신생아의 수면 패턴은 아직 정착되지 않아서 이런 일이 자주 일어납니다. 시간이 지나면서 점차 나아질 거예요. 가능할 때 낮잠을 자시거나, 가족의 도움을 받아 휴식을 취하시는 것이 중요해요.',
        sources: ['신생아 수면 패턴 이해', '아빠를 위한 육아 가이드']
      },
      {
        keywords: ['화', '짜증', '분노', '열받'],
        content: '화가 나는 마음, 충분히 이해해요. 육아와 일상의 스트레스가 쌓이면 감정 조절이 어려워질 수 있어요. 이런 감정을 느끼는 것 자체는 잘못이 아니에요. 중요한 건 그 감정을 어떻게 건강하게 표현하고 관리하느냐예요.',
        sources: ['감정 조절 전략', '아버지의 분노 관리법']
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

    // 감정 분석
    const analysis = analyzeEmotion(inputMessage);
    setCurrentMessageEmotions(analysis.emotions);
    setCurrentMessageStressors(analysis.stressors);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      emotions: analysis.emotions,
      stressors: analysis.stressors,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // 저장된 대화 로그 (로컬 스토리지)
    const savedLogs = JSON.parse(localStorage.getItem('chatLogs') || '[]');
    savedLogs.push({
      ...userMessage,
      date: new Date().toISOString().split('T')[0]
    });
    localStorage.setItem('chatLogs', JSON.stringify(savedLogs));

    // AI 응답 생성
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

      // CBT 질문 추가 (감정이 감지되었을 때)
      if (analysis.emotions.length > 0) {
        setTimeout(() => {
          const cbtQuestion = getCBTQuestion(analysis.emotions);
          if (cbtQuestion) {
            const cbtMessage: Message = {
              id: (Date.now() + 2).toString(),
              type: 'ai',
              content: `\n\n💭 **생각을 더 깊이 들여다볼까요?**\n\n${cbtQuestion}`,
              timestamp: new Date(),
              isCBTQuestion: true,
            };
            setMessages(prev => [...prev, cbtMessage]);
          }
        }, 1000);
      }

      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRemoveEmotion = (emotion: string) => {
    setCurrentMessageEmotions(prev => prev.filter(e => e !== emotion));
  };

  const handleRemoveStressor = (stressor: string) => {
    setCurrentMessageStressors(prev => prev.filter(s => s !== stressor));
  };

  // CBT 대화 시작 이벤트 리스너 추가
  useEffect(() => {
    const handleStartCBTConversation = (event: any) => {
      const { topic } = event.detail;
      startCBTConversation(topic);
    };

    window.addEventListener('startCBTConversation', handleStartCBTConversation);
    return () => window.removeEventListener('startCBTConversation', handleStartCBTConversation);
  }, []);

  const startCBTConversation = (topic: string) => {
    const cbtQuestions = {
      guilt: [
        "죄책감이 들 때, 자신에게 어떤 말을 하고 계시나요?",
        "혹시 '좋은 아빠라면 이렇게 하지 않았을 텐데'라는 생각이 드셨나요?",
        "그 죄책감이 정말 합리적인 것일까요?"
      ],
      anger: [
        "그렇게 화가 났을 때, 머릿속에 어떤 생각이 스쳐 지나갔나요?",
        "혹시 '나는 아빠 자격이 없나?'와 같은 생각이 드셨나요?",
        "그 순간 가장 강하게 느낀 감정은 무엇이었나요?"
      ]
    };

    const questions = cbtQuestions[topic as keyof typeof cbtQuestions];
    if (questions) {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      
      const cbtMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: `💭 **함께 생각해볼 시간이에요**\n\n${randomQuestion}`,
        timestamp: new Date(),
        isCBTQuestion: true,
      };

      setMessages(prev => [...prev, cbtMessage]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
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
                        : message.isCBTQuestion
                        ? 'bg-blue-600 text-white border-l-4 border-blue-300'
                        : 'bg-secondary text-white'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
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
                
                {/* 감정 태그 표시 (사용자 메시지 아래) */}
                {message.type === 'user' && (message.emotions?.length || message.stressors?.length) && (
                  <div className="mt-2 ml-11">
                    <EmotionTags
                      emotions={message.emotions || []}
                      stressors={message.stressors || []}
                      onRemoveEmotion={handleRemoveEmotion}
                      onRemoveStressor={handleRemoveStressor}
                    />
                  </div>
                )}
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

          {/* 현재 입력 중인 메시지의 감정 태그 미리보기 */}
          {inputMessage && (currentMessageEmotions.length > 0 || currentMessageStressors.length > 0) && (
            <div className="px-6 pb-2">
              <EmotionTags
                emotions={currentMessageEmotions}
                stressors={currentMessageStressors}
                onRemoveEmotion={handleRemoveEmotion}
                onRemoveStressor={handleRemoveStressor}
              />
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-6">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                  // 실시간 감정 분석
                  const analysis = analyzeEmotion(e.target.value);
                  setCurrentMessageEmotions(analysis.emotions);
                  setCurrentMessageStressors(analysis.stressors);
                }}
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
