
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, MessageCircle, AlertCircle } from 'lucide-react';
import PatternInsight from './PatternInsight';

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

interface ChatLog {
  id: string;
  content: string;
  emotions: string[];
  stressors: string[];
  date: string;
  timestamp: Date;
}

const emotionLabels = {
  anger: '분노',
  sadness: '슬픔',
  anxiety: '불안',
  guilt: '죄책감'
};

const stressorLabels = {
  parenting: '육아',
  work: '업무',
  relationship: '관계',
  personal: '개인시간'
};

const EmotionDashboard = () => {
  const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
  const [stressorData, setStressorData] = useState<StressorData[]>([]);
  const [recentLogs, setRecentLogs] = useState<ChatLog[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // 로컬스토리지에서 채팅 로그 불러오기
    const savedLogs = JSON.parse(localStorage.getItem('chatLogs') || '[]');
    
    // 지난 7일간의 데이터만 필터링
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentChatLogs = savedLogs.filter((log: any) => {
      const logDate = new Date(log.timestamp || log.date);
      return logDate >= weekAgo;
    });

    setRecentLogs(recentChatLogs);

    // 감정 데이터 집계
    const emotionCounts: { [key: string]: number } = {};
    const stressorCounts: { [key: string]: number } = {};

    recentChatLogs.forEach((log: any) => {
      if (log.emotions) {
        log.emotions.forEach((emotion: string) => {
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
        });
      }
      if (log.stressors) {
        log.stressors.forEach((stressor: string) => {
          stressorCounts[stressor] = (stressorCounts[stressor] || 0) + 1;
        });
      }
    });

    // 차트 데이터 변환
    const emotionChartData = Object.entries(emotionCounts).map(([emotion, count]) => ({
      emotion,
      count,
      label: emotionLabels[emotion as keyof typeof emotionLabels] || emotion
    }));

    const stressorChartData = Object.entries(stressorCounts).map(([stressor, count]) => ({
      stressor,
      count,
      label: stressorLabels[stressor as keyof typeof stressorLabels] || stressor
    }));

    setEmotionData(emotionChartData);
    setStressorData(stressorChartData);
  };

  const getLogsForDate = (date: string) => {
    return recentLogs.filter(log => 
      new Date(log.timestamp || log.date).toISOString().split('T')[0] === date
    );
  };

  const generateWeekDates = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">나의 감정 대시보드</h2>
        <p className="text-white/70">지난 7일간의 감정과 스트레스 패턴을 확인해보세요</p>
      </div>

      {/* 패턴 인사이트 */}
      <PatternInsight emotionData={emotionData} stressorData={stressorData} />

      {/* 감정 패턴 차트 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              주간 감정 빈도
            </CardTitle>
          </CardHeader>
          <CardContent>
            {emotionData.length > 0 ? (
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={emotionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="label" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[250px] flex items-center justify-center text-white/60">
                아직 충분한 대화 데이터가 없어요
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              스트레스 원인 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stressorData.length > 0 ? (
              <div className="space-y-3">
                {stressorData.map((item) => (
                  <div key={item.stressor} className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      {item.label}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/20 rounded-full px-3 py-1 text-sm">
                        {item.count}회
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-white/60">
                아직 충분한 대화 데이터가 없어요
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 과거 대화 로그 조회 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            지난 대화 다시보기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {generateWeekDates().map((date) => {
                const logsForDate = getLogsForDate(date);
                const hasLogs = logsForDate.length > 0;
                return (
                  <Button
                    key={date}
                    variant={selectedDate === date ? "default" : "outline"}
                    size="sm"
                    disabled={!hasLogs}
                    onClick={() => setSelectedDate(selectedDate === date ? '' : date)}
                    className="relative"
                  >
                    {new Date(date).toLocaleDateString('ko-KR', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                    {hasLogs && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </Button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="border-t border-border pt-4">
                <h4 className="font-medium mb-3">
                  {new Date(selectedDate).toLocaleDateString('ko-KR', { 
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric' 
                  })} 대화 기록
                </h4>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {getLogsForDate(selectedDate).map((log) => (
                    <div key={log.id} className="bg-secondary/30 p-4 rounded-lg">
                      <p className="text-sm mb-2 leading-relaxed">{log.content}</p>
                      <div className="flex flex-wrap gap-1">
                        {log.emotions?.map((emotion) => (
                          <Badge key={emotion} variant="destructive" className="text-xs">
                            #{emotionLabels[emotion as keyof typeof emotionLabels] || emotion}
                          </Badge>
                        ))}
                        {log.stressors?.map((stressor) => (
                          <Badge key={stressor} variant="outline" className="text-xs">
                            #{stressorLabels[stressor as keyof typeof stressorLabels] || stressor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionDashboard;
