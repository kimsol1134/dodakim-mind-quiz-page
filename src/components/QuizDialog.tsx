import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
// 분할된 UI
import QuizDialogIntro from "./QuizDialogIntro";
import QuizDialogQuestion from "./QuizDialogQuestion";
import QuizDialogResultEmail from "./QuizDialogResultEmail";
import QuizDialogComplete from "./QuizDialogComplete";
import QuizResultReport from "./QuizResultReport";

// 1. Define the type at the top to match the prop in QuizDialogQuestion
type Question = {
  type: "single" | "multi";
  question: string;
  options: string[];
  min?: number;
  max?: number;
};

// 2. Explicitly type the QUESTIONS array
const QUESTIONS: Question[] = [
  {
    type: "single",
    question: "요즘 '내 마음의 에너지'는 어느 정도라고 느끼시나요?",
    options: [
      "거의 방전 상태예요.",
      "간신힘들루 하루하루 버티고 있어요.",
      "그럭저럭 괜찮은 편이에요.",
      "에너지가 꽤 넘치는 편이에요.",
    ],
  },
  {
    type: "single",
    question: "가장 속 깊은 고민이나 힘든 감정을 편하게 터놓을 상대가 있다고 느끼시나요?",
    options: [
      "전혀 없어요.",
      "있긴 하지만, 솔직히 말하기는 어려워요.",
      "가끔 있는 편이에요.",
      "언제든 기댈 수 있는 상대가 있어요.",
    ],
  },
  {
    type: "single",
    question: "'아빠'가 아닌, 온전히 '나' 자신을 위한 시간을 일주일에 얼마나 갖고 계신가요?",
    options: [
      "거의 없다고 할 수 있어요.",
      "1시간이 채 안 돼요.",
      "가끔은 시간을 내려고 노력해요.",
      "충분히 갖고 있다고 생각해요.",
    ],
  },
  {
    type: "multi",
    question:
      "만약 '도닥임'을 사용한다면, 어떤 도움을 가장 받고 싶으신가요? (가장 중요한 것 1~2개 선택)",
    options: [
      "그냥 내 얘기를 판단 없이 들어주면 좋겠어요.",
      "스트레스나 화를 다스리는 방법을 알고 싶어요.",
      "아내와의 관계를 개선하고 싶어요.",
      "'나' 자신을 되찾고, 활력을 얻고 싶어요.",
      "다른 아빠들은 어떻게 지내는지 궁금해요.",
    ],
    min: 1,
    max: 2,
  },
];

// 기존 webhook 주소 → 신규 주소로 변경
const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/23383502/uyvouoz/";

export default function QuizDialog({
  open, onOpenChange,
}: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [step, setStep] = useState(0); // 0:hook 1~4:질문, 5:공감/이메일입력, 6:완료
  const [answers, setAnswers] = useState<any[]>([
    undefined, undefined, undefined, [],
  ]);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  // Validation
  const canNext =
    (step === 0) ||
    (step === 4 &&
      answers[3] &&
      Array.isArray(answers[3]) &&
      answers[3].length >= 1 &&
      answers[3].length <= 2) ||
    (step > 0 &&
      step < 4 &&
      answers[step - 1] !== undefined &&
      answers[step - 1] !== "");

  const handleNext = () => {
    if (step === 4) setStep(5);
    else setStep((s) => s + 1);
  };
  const handlePrev = () => {
    if (step === 0) return;
    setStep((s) => s - 1);
  };

  const handleSelect = (qIdx: number, value: any) => {
    setAnswers((prev) => {
      const newArr = [...prev];
      newArr[qIdx] = value;
      return newArr;
    });
  };

  // toggle multi-select option
  const handleCheckMulti = (idx: number) => {
    setAnswers((prev) => {
      const arr: number[] = Array.isArray(prev[3]) ? [...prev[3]] : [];
      if (arr.includes(idx)) {
        return prev.map((a, i) => (i === 3 ? arr.filter((i2) => i2 !== idx) : a));
      }
      // allow up to 2
      if (arr.length >= 2) {
        toast({
          title: "최대 2개까지 선택할 수 있어요.",
        });
        return prev;
      }
      return prev.map((a, i) => (i === 3 ? arr.concat(idx) : a));
    });
  };

  // Zapier Webhook 연동
  const sendToZapier = async (emailValue: string) => {
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          email: emailValue,
          answers,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      // 실제 실패시 사용자가 알 수 없으나 no-cors 사용, 에러는 콘솔로만
      console.error("Zapier webhook 전송 실패", e);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 이메일 포맷 검증
    if (!email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/)) {
      toast({ title: "올바른 이메일 주소를 입력해주세요." });
      return;
    }
    setEmailSent(true);
    await sendToZapier(email);
    setTimeout(() => {
      setStep(6);
      setEmailSent(false);
      setEmail("");
    }, 1500);
  };

  const closeAndReset = () => {
    setStep(0);
    onOpenChange(false);
  };

  // step: 0~6 기존, 7=리포트
  const [showReport, setShowReport] = useState(false);

  const handleGoReport = () => {
    setShowReport(true);
  };
  const closeReport = () => {
    setShowReport(false);
    setStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-h-[90dvh] overflow-y-auto max-w-md w-full">
        {!showReport && (
          <>
            {step === 0 && (
              <QuizDialogIntro onNext={handleNext} />
            )}
            {step > 0 && step < 5 && (
              <QuizDialogQuestion
                step={step}
                question={QUESTIONS[step - 1]}
                value={answers[step - 1]}
                onSelect={v => handleSelect(step - 1, v)}
                onCheckMulti={handleCheckMulti}
                canNext={canNext}
                onPrev={handlePrev}
                onNext={handleNext}
              />
            )}
            {step === 5 && (
              <QuizDialogResultEmail
                email={email}
                emailSent={emailSent}
                setEmail={setEmail}
                onSubmit={handleEmailSubmit}
                onClose={closeAndReset}
              />
            )}
            {step === 6 && (
              <QuizDialogComplete
                onClose={closeAndReset}
                onShowReport={handleGoReport}
              />
            )}
          </>
        )}
        {showReport && (
          <QuizResultReport
            answers={answers}
            onClose={closeReport}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
