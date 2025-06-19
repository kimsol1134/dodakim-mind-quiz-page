
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Heart, MessageCircle, TrendingUp } from 'lucide-react';

interface EmotionData {
  emotion: string;
  count: number;
  label: string;
}

interface StressorData {
  stressor: string;
  count: number;
  label: string;
}

interface PatternInsightProps {
  emotionData: EmotionData[];
  stressorData: StressorData[];
}

const PatternInsight = ({ emotionData, stressorData }: PatternInsightProps) => {
  const [insights, setInsights] = useState<Array<{
    type: 'warning' | 'info' | 'success';
    icon: any;
    title: string;
    message: string;
    action?: string;
  }>>([]);

  useEffect(() => {
    generateInsights();
  }, [emotionData, stressorData]);

  const generateInsights = () => {
    const newInsights = [];

    // 감정 패턴 분석
    const guiltCount = emotionData.find(e => e.emotion === 'guilt')?.count || 0;
    const angerCount = emotionData.find(e => e.emotion === 'anger')?.count || 0;
    const totalEmotions = emotionData.reduce((sum, e) => sum + e.count, 0);

    // 죄책감 패턴 감지
    if (guiltCount >= 3) {
      newInsights.push({
        type: 'warning' as const,
        icon: Heart,
        title: '죄책감 패턴 감지',
        message: `최근 '죄책감'이라는 감정의 언급 빈도가 늘어났어요. 잠시 그 마음에 대해 이야기 나눠볼까요?`,
        action: '대화하기'
      });
    }

    // 분노 패턴 감지
    if (angerCount >= 3) {
      newInsights.push({
        type: 'warning' as const,
        icon: AlertTriangle,
        title: '감정 조절 관심 필요',
        message: `화가 나는 상황이 자주 발생하고 있네요. 감정을 건강하게 표현하는 방법에 대해 함께 생각해보면 어떨까요?`,
        action: '조언 받기'
      });
    }

    // 스트레스 원인 분석
    const topStressor = stressorData.sort((a, b) => b.count - a.count)[0];
    if (topStressor && topStressor.count >= 2) {
      newInsights.push({
        type: 'info' as const,
        icon: TrendingUp,
        title: '주요 스트레스 원인 발견',
        message: `지난주 '${topStressor.label}'와 관련하여 가장 많이 힘들어하셨네요. 이 부분에 대한 전문가의 조언을 확인해보세요.`,
        action: '자료 보기'
      });
    }

    // 긍정적 패턴
    if (totalEmotions > 0 && totalEmotions < 5) {
      newInsights.push({
        type: 'success' as const,
        icon: Heart,
        title: '안정적인 감정 상태',
        message: '이번 주는 전반적으로 안정적인 감정 상태를 유지하고 계시네요. 스스로를 잘 돌보고 계시는 것 같아요.',
      });
    }

    setInsights(newInsights);
  };

  const handleInsightAction = (insight: any) => {
    if (insight.action === '대화하기') {
      // 채팅 탭으로 이동하면서 죄책감 관련 질문 시작
      const event = new CustomEvent('startCBTConversation', { 
        detail: { topic: 'guilt' } 
      });
      window.dispatchEvent(event);
    } else if (insight.action === '조언 받기') {
      const event = new CustomEvent('startCBTConversation', { 
        detail: { topic: 'anger' } 
      });
      window.dispatchEvent(event);
    }
  };

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        AI 인사이트
      </h3>
      <div className="grid gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className={`border-l-4 ${
            insight.type === 'warning' ? 'border-l-yellow-500 bg-yellow-500/5' :
            insight.type === 'info' ? 'border-l-blue-500 bg-blue-500/5' :
            'border-l-green-500 bg-green-500/5'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  insight.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' :
                  insight.type === 'info' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-green-500/20 text-green-500'
                }`}>
                  <insight.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-sm text-white/80 mb-3">{insight.message}</p>
                  {insight.action && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleInsightAction(insight)}
                    >
                      {insight.action}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatternInsight;
