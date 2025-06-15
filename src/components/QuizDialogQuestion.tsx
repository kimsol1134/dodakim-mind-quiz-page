
import React from "react";
import { DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

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
}) => (
  <form
    className="flex flex-col gap-8 p-8"
    onSubmit={e => {
      e.preventDefault();
      if (canNext) onNext();
    }}
  >
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
          {question.options.map((option, idx) => (
            <label
              key={option}
              className="flex items-center gap-3 hover:bg-accent rounded px-2 py-2 cursor-pointer"
            >
              <Checkbox
                checked={Array.isArray(value) && value.includes(idx)}
                onCheckedChange={() => onCheckMulti && onCheckMulti(idx)}
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
      <Button type="button" variant="secondary" onClick={onPrev}>이전</Button>
      <Button type="submit" disabled={!canNext} className="w-full">다음</Button>
    </DialogFooter>
  </form>
);

export default QuizDialogQuestion;
