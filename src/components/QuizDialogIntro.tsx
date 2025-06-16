
import React from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  onNext: () => void;
};

const QuizDialogIntro: React.FC<Props> = ({ onNext }) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <DialogTitle className="text-2xl text-center font-bold mb-2">
        {language === 'ko' 
          ? "나의 '마음 배터리', 지금 몇 퍼센트일까요?" 
          : "What's my 'mind battery' percentage right now?"
        }
      </DialogTitle>
      <DialogDescription className="text-base text-center mb-4 text-muted-foreground">
        {language === 'ko' 
          ? "아빠로서 나의 오늘은 어땠는지,\n간단한 질문을 통해 잠시 돌아보는 시간을 가져보세요.\n당신의 이야기를 들려주시면, '도닥임'이 가장 먼저 위로를 전해드릴게요."
          : "How was your day as a father?\nTake a moment to reflect through simple questions.\nShare your story with us, and 'Dadak-im' will be the first to offer you comfort."
        }
      </DialogDescription>
      <Button size="lg" className="w-full" onClick={onNext}>
        {language === 'ko' ? "내 마음 상태 확인하기" : "Check My Mind Status"}
      </Button>
    </div>
  );
};

export default QuizDialogIntro;
