
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const QUESTIONS = [
  {
    type: "single",
    question: "요즘 '내 마음의 에너지'는 어느 정도라고 느끼시나요?",
    options: [
      "거의 방전 상태예요.",
      "간신히 하루하루 버티고 있어요.",
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

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 간단한 이메일 포맷 검증
    if (!email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/)) {
      toast({ title: "올바른 이메일 주소를 입력해주세요." });
      return;
    }
    setEmailSent(true);
    setTimeout(() => {
      onOpenChange(false);
      setTimeout(() => {
        setStep(0);
        setAnswers([undefined, undefined, undefined, []]);
        setEmail("");
        setEmailSent(false);
      }, 300);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-h-[90dvh] overflow-y-auto max-w-md w-full">
        {/* Step 0: Hook */}
        {step === 0 && (
          <div className="flex flex-col items-center gap-6 p-8">
            <DialogTitle className="text-2xl text-center font-bold mb-2">나의 '마음 배터리', 지금 몇 퍼센트일까요?</DialogTitle>
            <DialogDescription className="text-base text-center mb-4 text-muted-foreground">
              아빠로서 나의 오늘은 어땠는지,<br />
              간단한 질문을 통해 잠시 돌아보는 시간을 가져보세요.<br />
              당신의 이야기를 들려주시면, '도닥임'이 가장 먼저 위로를 전해드릴게요.
            </DialogDescription>
            <Button size="lg" className="w-full" onClick={handleNext}>
              내 마음 상태 확인하기
            </Button>
          </div>
        )}
        {/* Step 1~4: Questions */}
        {step > 0 && step < 5 && (
          <form
            className="flex flex-col gap-8 p-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (canNext) handleNext();
            }}
          >
            <DialogHeader>
              <DialogTitle className="text-xl">{QUESTIONS[step - 1].question}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              {QUESTIONS[step - 1].type === "single" ? (
                <RadioGroup
                  value={answers[step - 1]}
                  onValueChange={(v) => handleSelect(step - 1, v)}
                >
                  {QUESTIONS[step - 1].options.map((option, idx) => (
                    <label
                      className="flex items-center gap-3 hover:bg-accent rounded px-2 py-2 cursor-pointer"
                      key={option}
                    >
                      <RadioGroupItem value={option} id={`radio-q${step}-${idx}`} />
                      <span className="text-base">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <div className="flex flex-col gap-3">
                  {QUESTIONS[3].options.map((option, idx) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 hover:bg-accent rounded px-2 py-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={answers[3]?.includes(idx)}
                        onCheckedChange={() => handleCheckMulti(idx)}
                        id={`quiz-multi-${idx}`}
                      />
                      <span className="text-base">{option}</span>
                    </label>
                  ))}
                  <span className="text-xs text-muted-foreground mt-1">
                    최대 2개까지 선택할 수 있어요.
                  </span>
                </div>
              )}
            </div>
            <DialogFooter className="flex gap-2">
              <Button type="button" variant="secondary" onClick={handlePrev}>이전</Button>
              <Button type="submit" disabled={!canNext} className="w-full">다음</Button>
            </DialogFooter>
          </form>
        )}
        {/* Step 5: 결과/공감/이메일 */}
        {step === 5 && (
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
              onSubmit={handleEmailSubmit}
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
                    onChange={(e) => setEmail(e.target.value)}
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
            </form>
            <Button variant="secondary" onClick={() => { setStep(0); onOpenChange(false); }}>
              닫기
            </Button>
          </div>
        )}
        {/* Step 6: 완료 메시지 */}
        {step === 6 && (
          <div className="flex flex-col gap-8 p-8 items-center justify-center">
            <DialogTitle className="text-xl text-center">
              등록이 완료되었습니다.<br />
              '도닥임'이 당신의 곁을 찾아갈 때, 가장 먼저 알려드릴게요.
            </DialogTitle>
            <Button onClick={() => { setStep(0); onOpenChange(false); }}>
              닫기
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

