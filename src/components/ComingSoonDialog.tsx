
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Heart, Mail, Users, CheckCircle, Rocket, Clock, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ComingSoonDialog: React.FC<ComingSoonDialogProps> = ({ open, onOpenChange }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/)) {
      toast({
        title: language === 'ko' ? "올바른 이메일 주소를 입력해주세요." : "Please enter a valid email address.",
      });
      return;
    }
    
    // 실제로는 이메일을 데이터베이스에 저장
    console.log('Beta signup email:', email);
    setIsSubmitted(true);
    
    toast({
      title: language === 'ko' ? "베타 테스터 신청 완료!" : "Beta Tester Application Complete!",
      description: language === 'ko' 
        ? "출시 알림을 가장 먼저 받아보실 수 있어요." 
        : "You'll be the first to know when we launch.",
    });
  };

  const navigateToExperience = () => {
    onOpenChange(false);
    window.location.href = '/app';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
          <DialogHeader className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">
              {language === 'ko' ? '도닥임 AI가 곧 찾아갑니다' : 'Dadak-im AI Coming Soon'}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">
              {language === 'ko' 
                ? '당신을 위한 특별한 AI 동반자를 준비하고 있어요' 
                : 'Preparing your special AI companion'}
            </p>
          </DialogHeader>

          {/* 개발 진행률 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {language === 'ko' ? '개발 진행률' : 'Development Progress'}
              </span>
              <span className="text-sm text-primary font-bold">85%</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1 text-center">
              {language === 'ko' 
                ? '곧 만나실 수 있도록 마지막 점검 중입니다' 
                : 'Final checks underway for your meeting'}
            </p>
          </div>

          {/* 주요 기능 미리보기 */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">
                {language === 'ko' ? 'AI 기반 맞춤형 상담 대화' : 'AI-powered personalized counseling'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">
                {language === 'ko' ? '일일 감정 기록 & 패턴 분석' : 'Daily emotion logging & pattern analysis'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">
                {language === 'ko' ? '전문가 검증 조언 데이터베이스' : 'Expert-verified advice database'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500" />
              <span className="text-sm">
                {language === 'ko' ? '위기 상황 감지 & 전문가 연결' : 'Crisis detection & expert connection'}
              </span>
            </div>
          </div>

          {/* 체험판 안내 */}
          <div className="bg-white/50 rounded-lg p-4 mb-6 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm">
                {language === 'ko' ? '체험판 이용 가능!' : 'Demo Version Available!'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              {language === 'ko' 
                ? '정식 출시 전, 기본 기능들을 미리 체험해보실 수 있어요' 
                : 'Try out basic features before the official launch'}
            </p>
            <Button 
              onClick={navigateToExperience} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              {language === 'ko' ? '체험판 사용해보기' : 'Try Demo Version'}
            </Button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 text-primary" />
                  {language === 'ko' ? '베타 테스터 신청' : 'Beta Tester Application'}
                </label>
                <Input
                  type="email"
                  placeholder={language === 'ko' ? "이메일 주소를 입력하세요" : "Enter your email address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                {language === 'ko' ? '얼리 액세스 신청하기' : 'Apply for Early Access'}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-medium text-green-700">
                {language === 'ko' ? '신청이 완료되었어요!' : 'Application completed!'}
              </p>
              <p className="text-sm text-muted-foreground">
                {language === 'ko' 
                  ? '출시 소식을 가장 먼저 알려드릴게요' 
                  : "We'll notify you first about the launch"}
              </p>
            </div>
          )}

          {/* 소셜 프루프 */}
          <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{language === 'ko' ? '이미 1,247명 신청' : '1,247 signed up'}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>{language === 'ko' ? '100% 익명 보장' : '100% Anonymous'}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;
