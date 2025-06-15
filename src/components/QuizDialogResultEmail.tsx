
import React, { useState } from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Wrapper for form submit to enforce checkbox
  const handleSubmit = (e: React.FormEvent) => {
    if (!agree) {
      e.preventDefault();
      toast({
        title: "개인정보 수집 및 이용 동의가 필요합니다.",
        description: "서비스 소식 및 혜택 안내를 위해 동의해주셔야 등록이 가능합니다.",
      });
      return;
    }
    onSubmit(e);
  };

  return (
    <div className="flex flex-col gap-6 p-8">
      <DialogHeader className="mb-2">
        <DialogTitle className="text-xl font-bold">
          답변해주셔서 감사합니다. 당신 혼자만 그런 것이 아닙니다.
        </DialogTitle>
        <DialogDescription className="mt-3 text-base text-muted-foreground">
          많은 아버지들이 비슷한 감정과 고민을 안고 살아갑니다.<br />
          힘들다고 말하지 못했을 뿐, 모두 각자의 무게를 견디고 있죠.<br />
          당신의 지친 마음에 가장 먼저 따뜻한 위로를 건넬 수 있도록,<br />
          '도닥임'이 곧 찾아갑니다.<br />
        </DialogDescription>
      </DialogHeader>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        autoComplete="off"
      >
        <div>
          <span className="font-bold text-lg block mb-2">
            '도닥임' 대기자 명단에 등록하고 가장 먼저 소식을 받아보세요.
          </span>
          <div className="flex gap-2 mt-2">
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일 주소를 입력해주세요"
              required
              disabled={emailSent}
            />
            <Button type="submit" disabled={emailSent}>가장 먼저 위로 받기</Button>
          </div>
          <div className="mt-3 text-sm text-muted-foreground flex flex-col gap-1">
            <span>✓ 정식 출시 시 가장 먼저 알림</span>
            <span>✓ 초기 사용자들을 위한 특별 혜택 제공</span>
          </div>
        </div>
        <div className="flex items-center mt-2 gap-2">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={val => setAgree(!!val)}
            required
            disabled={emailSent}
          />
          <label htmlFor="agree" className="text-sm leading-5 select-none">
            <span className="font-medium text-primary mr-1">[필수]</span>
            개인정보 수집 및 이용 동의 (
            <span className="font-normal text-muted-foreground">
              서비스 출시 소식 및 관련 정보 제공 목적
            </span>
            )
          </label>
        </div>
        <div className="text-xs text-muted-foreground ml-1">
          동의를 거부하실 수 있으나, 명단 등록 및 안내 제공이 제한됩니다.
        </div>
      </form>
      <Button variant="secondary" onClick={onClose}>
        닫기
      </Button>
    </div>
  );
};

export default QuizDialogResultEmail;
