
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WeeklyNotificationProps {
  onDismiss: () => void;
}

const WeeklyNotification = ({ onDismiss }: WeeklyNotificationProps) => {
  const [weeklyInsight, setWeeklyInsight] = useState<string>('');
  const { language } = useLanguage();

  useEffect(() => {
    generateWeeklyInsight();
  }, [language]);

  const generateWeeklyInsight = () => {
    // 실제로는 백엔드에서 분석된 데이터를 받아옴
    const savedLogs = JSON.parse(localStorage.getItem('chatLogs') || '[]');
    
    // 지난 주 데이터 분석
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyLogs = savedLogs.filter((log: any) => {
      const logDate = new Date(log.timestamp || log.date);
      return logDate >= weekAgo;
    });

    if (weeklyLogs.length === 0) {
      setWeeklyInsight(
        language === 'ko' 
          ? "이번 주는 대화를 나누지 않으셨네요. 언제든 마음이 힘들 때 찾아와 주세요."
          : "You haven't had any conversations this week. Please come anytime when your heart feels heavy."
      );
      return;
    }

    // 가장 빈번한 스트레스 원인 찾기
    const stressorCounts: { [key: string]: number } = {};
    weeklyLogs.forEach((log: any) => {
      if (log.stressors) {
        log.stressors.forEach((stressor: string) => {
          stressorCounts[stressor] = (stressorCounts[stressor] || 0) + 1;
        });
      }
    });

    const stressorLabels = {
      ko: {
        parenting: '육아',
        work: '업무',
        relationship: '관계',
        personal: '개인시간'
      },
      en: {
        parenting: 'parenting',
        work: 'work',
        relationship: 'relationships',
        personal: 'personal time'
      }
    };

    const topStressor = Object.entries(stressorCounts).sort((a, b) => b[1] - a[1])[0];
    
    if (topStressor) {
      const stressorLabel = stressorLabels[language as keyof typeof stressorLabels][topStressor[0] as keyof typeof stressorLabels.ko] || topStressor[0];
      setWeeklyInsight(
        language === 'ko'
          ? `지난주 당신은 '${stressorLabel}'와 관련하여 가장 많이 힘들어하셨네요. 스스로를 돌보는 시간을 가진 한 주, 정말 고생 많으셨습니다.`
          : `Last week you struggled most with '${stressorLabel}'. You've worked so hard this week taking time to care for yourself.`
      );
    } else {
      setWeeklyInsight(
        language === 'ko'
          ? "지난 한 주도 수고 많으셨어요. 당신의 마음과 노력을 응원합니다."
          : "You've worked hard this past week too. I support your heart and efforts."
      );
    }
  };

  return (
    <Card className="mb-6 border-primary/50 bg-primary/5">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/20 text-primary">
            <Bell className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-1 text-primary">
              {language === 'ko' ? '주간 요약' : 'Weekly Summary'}
            </h4>
            <p className="text-sm text-white/80">{weeklyInsight}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyNotification;
