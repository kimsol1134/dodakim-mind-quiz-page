
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Save, Moon, Dumbbell, Wine, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyLogData {
  date: string;
  sleepHours: number;
  exercised: boolean;
  drankAlcohol: boolean;
  stressLevel: number;
  moodNote: string;
}

const DailyLog = () => {
  const { toast } = useToast();
  const [logData, setLogData] = useState<DailyLogData>({
    date: new Date().toISOString().split('T')[0],
    sleepHours: 7,
    exercised: false,
    drankAlcohol: false,
    stressLevel: 5,
    moodNote: ''
  });

  const handleSave = () => {
    // 여기서 실제로는 데이터베이스에 저장
    console.log('Saving daily log:', logData);
    toast({
      title: "데일리 로그 저장 완료",
      description: "오늘의 기록이 성공적으로 저장되었어요.",
    });
  };

  const stressLevelText = {
    1: '매우 편안',
    2: '편안',
    3: '보통',
    4: '약간 스트레스',
    5: '보통 스트레스',
    6: '스트레스',
    7: '많은 스트레스',
    8: '매우 스트레스',
    9: '극심한 스트레스',
    10: '견딜 수 없음'
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">데일리 로그</h2>
        <p className="text-white/70">매일의 상태를 기록하여 패턴을 파악해보세요</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            오늘의 기록
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 날짜 */}
          <div>
            <Label htmlFor="date">날짜</Label>
            <Input
              id="date"
              type="date"
              value={logData.date}
              onChange={(e) => setLogData({...logData, date: e.target.value})}
              className="mt-1"
            />
          </div>

          {/* 수면 시간 */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Moon className="w-4 h-4 text-primary" />
              수면 시간: {logData.sleepHours}시간
            </Label>
            <Slider
              value={[logData.sleepHours]}
              onValueChange={(value) => setLogData({...logData, sleepHours: value[0]})}
              max={12}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>0시간</span>
              <span>12시간</span>
            </div>
          </div>

          {/* 운동 여부 */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-primary" />
              오늘 운동을 했나요?
            </Label>
            <Switch
              checked={logData.exercised}
              onCheckedChange={(checked) => setLogData({...logData, exercised: checked})}
            />
          </div>

          {/* 음주 여부 */}
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Wine className="w-4 h-4 text-primary" />
              오늘 음주를 했나요?
            </Label>
            <Switch
              checked={logData.drankAlcohol}
              onCheckedChange={(checked) => setLogData({...logData, drankAlcohol: checked})}
            />
          </div>

          {/* 스트레스 지수 */}
          <div>
            <Label className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-primary" />
              스트레스 지수: {logData.stressLevel}/10 ({stressLevelText[logData.stressLevel as keyof typeof stressLevelText]})
            </Label>
            <Slider
              value={[logData.stressLevel]}
              onValueChange={(value) => setLogData({...logData, stressLevel: value[0]})}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/60 mt-1">
              <span>1 (편안)</span>
              <span>10 (극심함)</span>
            </div>
          </div>

          {/* 감정 메모 */}
          <div>
            <Label htmlFor="moodNote">오늘의 감정 메모</Label>
            <Textarea
              id="moodNote"
              placeholder="오늘 어떤 기분이셨나요? 특별한 일이 있었다면 적어보세요..."
              value={logData.moodNote}
              onChange={(e) => setLogData({...logData, moodNote: e.target.value})}
              className="mt-1 min-h-[100px]"
            />
          </div>

          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="w-4 h-4 mr-2" />
            오늘의 기록 저장하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyLog;
