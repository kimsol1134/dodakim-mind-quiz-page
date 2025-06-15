
import React from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  onNext: () => void;
};

const QuizDialogIntro: React.FC<Props> = ({ onNext }) => (
  <div className="flex flex-col items-center gap-6 p-8">
    <DialogTitle className="text-2xl text-center font-bold mb-2">나의 '마음 배터리', 지금 몇 퍼센트일까요?</DialogTitle>
    <DialogDescription className="text-base text-center mb-4 text-muted-foreground">
      아빠로서 나의 오늘은 어땠는지,<br />
      간단한 질문을 통해 잠시 돌아보는 시간을 가져보세요.<br />
      당신의 이야기를 들려주시면, '도닥임'이 가장 먼저 위로를 전해드릴게요.
    </DialogDescription>
    <Button size="lg" className="w-full" onClick={onNext}>
      내 마음 상태 확인하기
    </Button>
  </div>
);

export default QuizDialogIntro;
