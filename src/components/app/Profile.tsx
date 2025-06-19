
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, Phone, ExternalLink } from 'lucide-react';
import EPDSTest from '@/components/app/EPDSTest';

const Profile = () => {
  const [showEPDSTest, setShowEPDSTest] = useState(false);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');

  const emergencyContacts = [
    { name: '보건복지부 희망의 전화', number: '129', available: '24시간' },
    { name: '정신건강 위기상담전화', number: '1577-0199', available: '24시간' },
    { name: '생명의 전화', number: '1588-9191', available: '24시간' },
  ];

  const riskLevelConfig = {
    low: {
      color: 'text-green-500 bg-green-500/20',
      title: '양호',
      description: '현재 정신건강 상태가 안정적입니다.'
    },
    medium: {
      color: 'text-yellow-500 bg-yellow-500/20',
      title: '주의',
      description: '스트레스 관리와 휴식이 필요한 상태입니다.'
    },
    high: {
      color: 'text-red-500 bg-red-500/20',
      title: '위험',
      description: '전문가의 도움이 필요할 수 있습니다.'
    }
  };

  if (showEPDSTest) {
    return <EPDSTest onComplete={(score) => {
      setShowEPDSTest(false);
      if (score >= 13) setRiskLevel('high');
      else if (score >= 10) setRiskLevel('medium');
      else setRiskLevel('low');
    }} onClose={() => setShowEPDSTest(false)} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">내 정보</h2>
        <p className="text-white/70">정신건강 상태를 확인하고 필요시 전문가 도움을 받으세요</p>
      </div>

      {/* 현재 위험도 */}
      <Card>
        <CardHeader>
          <CardTitle>현재 정신건강 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`p-4 rounded-lg ${riskLevelConfig[riskLevel].color} mb-4`}>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">{riskLevelConfig[riskLevel].title}</span>
            </div>
            <p className="text-sm">{riskLevelConfig[riskLevel].description}</p>
          </div>
          
          <Button 
            onClick={() => setShowEPDSTest(true)}
            variant="outline" 
            className="w-full"
          >
            EPDS-P 검사 다시 받기
          </Button>
          <p className="text-xs text-white/60 mt-2 text-center">
            * 본 검사는 자가 진단 참고 자료이며, 의학적 진단을 대체할 수 없습니다.
          </p>
        </CardContent>
      </Card>

      {/* 위험 단계별 안내 */}
      {riskLevel === 'high' && (
        <Card className="border-red-500/50 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              즉시 도움이 필요합니다
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              지금 매우 힘든 시간을 보내고 계신 것 같아 진심으로 걱정됩니다. 
              혼자 감당하지 않으셔도 괜찮아요. 즉시 도움을 받을 수 있는 곳들이 있습니다.
            </p>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-white/70">{contact.available}</div>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Phone className="w-4 h-4" />
                    {contact.number}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 도움 받기 */}
      <Card>
        <CardHeader>
          <CardTitle>전문가 도움 받기</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-semibold mb-2">정신건강 전문가를 찾아야 하는 신호</h4>
            <ul className="text-sm text-white/80 space-y-1">
              <li>• 2주 이상 지속되는 우울감이나 무기력감</li>
              <li>• 평소 즐겁던 일에 흥미를 잃음</li>
              <li>• 수면 패턴의 급격한 변화</li>
              <li>• 집중력 저하와 업무 능력 감소</li>
              <li>• 가족이나 친구들과의 관계 악화</li>
            </ul>
          </div>
          
          <Button variant="outline" className="w-full gap-2">
            <ExternalLink className="w-4 h-4" />
            가까운 정신건강복지센터 찾기
          </Button>
        </CardContent>
      </Card>

      {/* 응급 상황 대응 */}
      <Card>
        <CardHeader>
          <CardTitle>24시간 긴급 상담</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 mb-4">
            위급한 상황이거나 즉시 누군가와 이야기하고 싶을 때 언제든 연락하세요.
          </p>
          <div className="grid gap-2">
            {emergencyContacts.map((contact, index) => (
              <Button key={index} variant="outline" className="justify-between">
                <span>{contact.name}</span>
                <span className="font-mono">{contact.number}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
