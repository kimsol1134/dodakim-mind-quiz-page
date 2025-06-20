
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import EmotionTags from './EmotionTags';
import { analyzeEmotions, generateCBTQuestions } from '@/utils/cbtQuestions';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  content: string;
  is_ai: boolean;
  emotions: string[];
  stressors: string[];
  is_cbt_question: boolean;
  created_at: string;
}

const ChatInterfaceWithAuth = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentEmotions, setCurrentEmotions] = useState<string[]>([]);
  const [currentStressors, setCurrentStressors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      initializeConversation();
      loadMessages();
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initializeConversation = async () => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user?.id,
          title: '새 대화'
        })
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('대화를 시작할 수 없습니다.');
    }
  };

  const loadMessages = async () => {
    if (!conversationId) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const saveMessage = async (content: string, isAi: boolean, emotions: string[] = [], stressors: string[] = [], isCbtQuestion: boolean = false) => {
    if (!conversationId || !user) return null;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          user_id: user.id,
          content,
          is_ai: isAi,
          emotions,
          stressors,
          is_cbt_question: isCbtQuestion
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading || !user) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setLoading(true);

    try {
      // 감정 분석
      const emotions = analyzeEmotions(userMessage);
      const stressors: string[] = [];

      // 사용자 메시지 저장
      const savedUserMessage = await saveMessage(userMessage, false, emotions, stressors);
      if (savedUserMessage) {
        setMessages(prev => [...prev, savedUserMessage]);
      }

      // AI 응답 요청
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: userMessage,
          emotions,
          stressors,
          conversationHistory: messages.slice(-5) // 최근 5개 메시지만 전송
        }
      });

      if (error) throw error;

      if (data.success) {
        // AI 응답 저장
        const savedAiMessage = await saveMessage(data.response, true);
        if (savedAiMessage) {
          setMessages(prev => [...prev, savedAiMessage]);
        }

        // CBT 질문이 필요한 경우 추가
        if (emotions.length > 0) {
          const cbtQuestions = generateCBTQuestions(emotions, 'ko');
          if (cbtQuestions.length > 0) {
            const cbtMessage = cbtQuestions[0];
            const savedCbtMessage = await saveMessage(cbtMessage, true, [], [], true);
            if (savedCbtMessage) {
              setMessages(prev => [...prev, savedCbtMessage]);
            }
          }
        }
      } else {
        toast.error('AI 응답을 받을 수 없습니다.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('메시지 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputMessage(value);

    // 실시간 감정 분석
    const emotions = analyzeEmotions(value);
    setCurrentEmotions(emotions);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white/70">로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">도닥임과 대화</h2>
          <p className="text-white/70">안녕하세요, {user.user_metadata?.full_name || user.email}님</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="w-4 h-4 mr-2" />
          로그아웃
        </Button>
      </div>

      {/* 채팅 영역 */}
      <Card className="mb-4">
        <CardContent className="p-6">
          <ScrollArea className="h-96 mb-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-white/70 py-8">
                  <Bot className="w-8 h-8 mx-auto mb-2" />
                  <p>안녕하세요! 오늘 어떤 일로 힘드셨나요?</p>
                  <p className="text-sm mt-1">편안하게 이야기해주세요.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.is_ai ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.is_ai && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.is_ai
                          ? message.is_cbt_question
                            ? 'bg-blue-500/20 border border-blue-500/50'
                            : 'bg-secondary'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.emotions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {message.emotions.map((emotion) => (
                            <span key={emotion} className="text-xs bg-white/20 px-2 py-1 rounded">
                              #{emotion}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {!message.is_ai && (
                      <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-secondary p-3 rounded-lg">
                    <p className="text-white/70">생각하고 있어요...</p>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* 실시간 감정 태그 */}
          <EmotionTags
            emotions={currentEmotions}
            stressors={currentStressors}
            onRemoveEmotion={(emotion) =>
              setCurrentEmotions(prev => prev.filter(e => e !== emotion))
            }
            onRemoveStressor={(stressor) =>
              setCurrentStressors(prev => prev.filter(s => s !== stressor))
            }
          />

          {/* 입력 영역 */}
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="여기에 메시지를 입력하세요..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={loading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={loading || !inputMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterfaceWithAuth;
