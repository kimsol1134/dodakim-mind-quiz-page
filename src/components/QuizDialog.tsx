
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQuizState } from "@/hooks/useQuizState";
import { sendToZapier } from "@/utils/webhookService";
import { QUESTIONS } from "@/data/quizData";

// 분할된 UI 컴포넌트들
import QuizDialogIntro from "./QuizDialogIntro";
import QuizDialogQuestion from "./QuizDialogQuestion";
import QuizDialogResultEmail from "./QuizDialogResultEmail";
import QuizDialogComplete from "./QuizDialogComplete";
import QuizResultReport from "./QuizResultReport";

export default function QuizDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { toast } = useToast();
  const {
    step,
    setStep,
    answers,
    email,
    setEmail,
    emailSent,
    setEmailSent,
    showReport,
    setShowReport,
    handleSelect,
    handleCheckMulti,
    resetQuiz,
  } = useQuizState();

  // Validation
  const canNext =
    step === 0 ||
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

  const handleCheckMultiWithToast = (idx: number) => {
    const arr: number[] = Array.isArray(answers[3]) ? [...answers[3]] : [];
    if (!arr.includes(idx) && arr.length >= 2) {
      toast({
        title: "최대 2개까지 선택할 수 있어요.",
      });
      return;
    }
    handleCheckMulti(idx);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.match(/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/)) {
      toast({ title: "올바른 이메일 주소를 입력해주세요." });
      return;
    }
    setEmailSent(true);
    await sendToZapier(email, answers);
    setTimeout(() => {
      setStep(6);
      setEmailSent(false);
      setEmail("");
    }, 1500);
  };

  const closeAndReset = () => {
    resetQuiz();
    onOpenChange(false);
  };

  const handleGoReport = () => {
    setShowReport(true);
  };

  const closeReport = () => {
    setShowReport(false);
    resetQuiz();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-h-[90dvh] overflow-y-auto max-w-md w-full">
        {!showReport && (
          <>
            {step === 0 && <QuizDialogIntro onNext={handleNext} />}
            {step > 0 && step < 5 && (
              <QuizDialogQuestion
                step={step}
                question={QUESTIONS[step - 1]}
                value={answers[step - 1]}
                onSelect={(v) => handleSelect(step - 1, v)}
                onCheckMulti={handleCheckMultiWithToast}
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
          <QuizResultReport answers={answers} onClose={closeReport} />
        )}
      </DialogContent>
    </Dialog>
  );
}
