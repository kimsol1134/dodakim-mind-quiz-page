
import React from "react";
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/LanguageContext";
import QuizProgress from "./QuizProgress";

type Question = {
  type: "single" | "multi";
  question: string;
  options: string[];
  min?: number;
  max?: number;
};

interface Props {
  step: number;
  question: Question;
  value: any;
  onSelect: (v: any) => void;
  onCheckMulti?: (idx: number) => void;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const QuizDialogQuestion: React.FC<Props> = ({
  step, question, value, onSelect, onCheckMulti, canNext, onPrev, onNext,
}) => {
  const { language } = useLanguage();
  
  return (
    <form
      className="flex flex-col gap-6 p-8"
      onSubmit={e => {
        e.preventDefault();
        if (canNext) onNext();
      }}
    >
      <QuizProgress currentStep={step} totalSteps={4} />
      
      <DialogHeader>
        <DialogTitle className="text-xl">{question.question}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        {question.type === "single" ? (
          <RadioGroup
            value={value}
            onValueChange={onSelect}
          >
            {question.options.map((option, idx) => (
              <label
                className="flex items-center gap-3 hover:bg-accent rounded px-3 py-3 cursor-pointer transition-colors min-h-[48px]"
                key={option}
              >
                <RadioGroupItem value={option} id={`radio-q${step}-${idx}`} />
                <span className="text-base leading-relaxed">{option}</span>
              </label>
            ))}
          </RadioGroup>
        ) : (
          <div className="flex flex-col gap-3">
            {question.options.map((option, idx) => (
              <label
                key={option}
                className="flex items-center gap-3 hover:bg-accent rounded px-3 py-3 cursor-pointer transition-colors min-h-[48px]"
              >
                <Checkbox
                  checked={Array.isArray(value) && value.includes(idx)}
                  onCheckedChange={() => onCheckMulti && onCheckMulti(idx)}
                  id={`quiz-multi-${idx}`}
                />
                <span className="text-base leading-relaxed">{option}</span>
              </label>
            ))}
            <span className="text-xs text-muted-foreground mt-1">
              {language === 'ko' ? "최대 2개까지 선택할 수 있어요." : "You can select up to 2 options."}
            </span>
          </div>
        )}
      </div>
      <DialogFooter className="flex gap-2">
        <Button type="button" variant="secondary" onClick={onPrev} className="min-h-[44px]">
          {language === 'ko' ? "이전" : "Previous"}
        </Button>
        <Button type="submit" disabled={!canNext} className="w-full min-h-[44px]">
          {language === 'ko' ? "다음" : "Next"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default QuizDialogQuestion;
