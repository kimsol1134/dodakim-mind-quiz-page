
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Moon, Dumbbell, Wine, Heart } from 'lucide-react';

const WeeklyReport = () => {
  // 샘플 데이터 (실제로는 API에서 가져옴)
  const weeklyData = [
    { day: '월', sleep: 6, stress: 7, mood: 6 },
    { day: '화', sleep: 5, stress: 8, mood: 5 },
    { day: '수', sleep: 7, stress: 5, mood: 7 },
    { day: '목', sleep: 6, stress: 6, mood: 6 },
    { day: '금', sleep: 4, stress: 9, mood: 4 },
    { day: '토', sleep: 8, stress: 3, mood: 8 },
    { day: '일', sleep: 7, stress: 4, mood: 7 },
  ];

  const insights = [
    {
      type: 'warning',
      icon: AlertTriangle,
      title: '수면 부족과 스트레스 상관관계 발견',
      description: '수면 시간이 5시간 미만인 날에 스트레스 지수가 평균 2배 높게 나타났습니다.',
      suggestion: '규칙적인 수면 패턴을 유지하는 것이 스트레스 관리에 도움이 될 것 같아요.',
      source: '수면과 정신건강 연구 - 서울대 의과대학'
    },
    {
      type: 'positive',
      icon: CheckCircle,
      title: '주말 회복력 우수',
      description: '주말에 충분한 휴식을 통해 스트레스 지수가 현저히 개선되었습니다.',
      suggestion: '이런 패턴을 평일에도 적용해보시면 어떨까요?',
      source: '스트레스 회복 패턴 분석'
    }
  ];

  const averages = {
    sleep: 6.1,
    stress: 6.0,
    exercise: 3, // 일주일 중 3일
    alcohol: 2   // 일주일 중 2일
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">주간 리포트</h2>
        <p className="text-white/70">지난 주 당신의 마음과 몸의 패턴을 분석했어요</p>
      </div>

      {/* 주요 지표 요약 */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Moon className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{averages.sleep}시간</div>
            <div className="text-sm text-white/70">평균 수면</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{averages.stress}/10</div>
            <div className="text-sm text-white/70">평균 스트레스</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Dumbbell className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{averages.exercise}일</div>
            <div className="text-sm text-white/70">운동한 날</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Wine className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{averages.alcohol}일</div>
            <div className="text-sm text-white/70">음주한 날</div>
          </CardContent>
        </Card>
      </div>

      {/* 주간 트렌드 차트 */}
      <Card>
        <CardHeader>
          <CardTitle>주간 트렌드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="수면시간"
                />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="스트레스"
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="기분"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI 인사이트 */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold">AI 인사이트</h3>
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  insight.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                }`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{insight.title}</h4>
                  <p className="text-white/80 mb-2">{insight.description}</p>
                  <p className="text-primary text-sm mb-2">{insight.suggestion}</p>
                  <p className="text-xs text-white/60">출처: {insight.source}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 권장 사항 */}
      <Card>
        <CardHeader>
          <CardTitle>이번 주 권장 사항</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">🌙 수면 개선</h4>
            <p className="text-sm text-white/80">매일 밤 11시 이전에 잠자리에 들어보세요. 수면 시간을 1시간만 늘려도 스트레스 지수가 크게 개선될 수 있어요.</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg">
            <h4 className="font-semibold text-green-500 mb-2">🏃‍♂️ 운동 습관</h4>
            <p className="text-sm text-white/80">주 3-4회 가벼운 운동을 추천드려요. 산책이나 홈트레이닝으로 시작해보세요.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReport;
