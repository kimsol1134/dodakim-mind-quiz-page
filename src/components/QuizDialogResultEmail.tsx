
import React, { useState } from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  email: string;
  emailSent: boolean;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

const QuizDialogResultEmail: React.FC<Props> = ({
  email, emailSent, setEmail, onSubmit, onClose,
}) => {
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();

  // Wrapper for form submit to enforce checkbox
  const handleSubmit = async (e: React.FormEvent) => {
    if (!agree) {
      e.preventDefault();
      toast({
        title: language === 'ko' 
          ? "개인정보 수집 및 이용 동의가 필요합니다."
          : "Privacy policy agreement is required.",
        description: language === 'ko'
          ? "서비스 소식 및 혜택 안내를 위해 동의해주셔야 등록이 가능합니다."
          : "You must agree to receive service updates and benefits to register.",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <DialogHeader className="mb-2">
        <DialogTitle className="text-xl font-bold">
          {language === 'ko' 
            ? "답변해주셔서 감사합니다. 당신 혼자만 그런 것이 아닙니다."
            : "Thank you for your responses. You're not alone in this."
          }
        </DialogTitle>
        <DialogDescription className="mt-3 text-base text-muted-foreground">
          {language === 'ko' ? (
            <>
              많은 아버지들이 비슷한 감정과 고민을 안고 살아갑니다.<br />
              힘들다고 말하지 못했을 뿐, 모두 각자의 무게를 견디고 있죠.<br />
              당신의 지친 마음에 가장 먼저 따뜻한 위로를 건넬 수 있도록,<br />
              '도닥임'이 곧 찾아갑니다.<br />
            </>
          ) : (
            <>
              Many fathers live with similar emotions and concerns.<br />
              They just couldn't say it was hard, but everyone bears their own weight.<br />
              So that we can offer warm comfort to your tired heart first,<br />
              'Dadak-im' will come to you soon.<br />
            </>
          )}
        </DialogDescription>

        {/* 통계 정보 추가 */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            {language === 'ko' 
              ? "📊 전체 아버지 중 73%가 비슷한 고민을 겪고 있습니다"
              : "📊 73% of all fathers experience similar concerns"
            }
          </p>
        </div>
      </DialogHeader>
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <div>
          <span className="font-bold text-lg block mb-2">
            {language === 'ko'
              ? "'도닥임' 대기자 명단에 등록하고 가장 먼저 소식을 받아보세요."
              : "Register for the 'Dadak-im' waiting list and be the first to receive updates."
            }
          </span>
          <div className="flex gap-2 mt-2">
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={language === 'ko' 
                ? "이메일 주소를 입력해주세요"
                : "Enter your email address"
              }
              required
              disabled={emailSent || isSubmitting}
              className="min-h-[44px]"
            />
            <Button 
              type="submit" 
              disabled={emailSent || isSubmitting}
              className="min-h-[44px] px-6"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {language === 'ko' ? "등록 중..." : "Registering..."}
                </div>
              ) : (
                language === 'ko' ? "가장 먼저 위로 받기" : "Get Comfort First"
              )}
            </Button>
          </div>
          <div className="mt-2 mb-1 text-xs text-muted-foreground">
            {language === 'ko' ? (
              <>
                수집 목적: 서비스 출시 소식 및 관련 정보 제공<br />
                보관 기간: 안내 제공 완료 시까지 또는 동의 철회 시 즉시 파기
              </>
            ) : (
              <>
                Collection Purpose: Service launch news and related information<br />
                Retention Period: Until guidance is provided or consent is withdrawn
              </>
            )}
          </div>
          <div className="mt-3 text-sm text-muted-foreground flex flex-col gap-1">
            <span>
              {language === 'ko' 
                ? "✓ 정식 출시 시 가장 먼저 알림"
                : "✓ First notification when officially launched"
              }
            </span>
            <span>
              {language === 'ko'
                ? "✓ 초기 사용자들을 위한 특별 혜택 제공"
                : "✓ Special benefits for early users"
              }
            </span>
          </div>
        </div>
        <div className="flex items-start mt-2 gap-3">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={val => setAgree(!!val)}
            required
            disabled={emailSent || isSubmitting}
            className="mt-1"
          />
          <label htmlFor="agree" className="text-sm leading-5 select-none cursor-pointer">
            <span className="font-medium text-primary mr-1">
              {language === 'ko' ? "[필수]" : "[Required]"}
            </span>
            {language === 'ko' ? (
              <>
                개인정보 수집 및 이용 동의 (
                <span className="font-normal text-muted-foreground">
                  서비스 출시 소식 및 관련 정보 제공 목적
                </span>
                )
              </>
            ) : (
              <>
                Privacy policy agreement (
                <span className="font-normal text-muted-foreground">
                  for service launch news and related information
                </span>
                )
              </>
            )}
          </label>
        </div>
        <div className="text-xs text-muted-foreground ml-1">
          {language === 'ko'
            ? "동의를 거부하실 수 있으나, 명단 등록 및 안내 제공이 제한됩니다."
            : "You may refuse consent, but registration and guidance will be limited."
          }
        </div>
      </form>
      <Button variant="secondary" onClick={onClose} className="min-h-[44px]">
        {language === 'ko' ? "닫기" : "Close"}
      </Button>
    </div>
  );
};

export default QuizDialogResultEmail;
