
import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  onClose: () => void;
  onShowReport?: () => void;
};

const QuizDialogComplete = ({ onClose, onShowReport }: Props) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col gap-8 p-8 items-center justify-center">
      <DialogTitle className="text-xl text-center">
        {language === 'ko' 
          ? "등록이 완료되었습니다.\n'도닥임'이 당신의 곁을 찾아갈 때, 가장 먼저 알려드릴게요."
          : "Registration completed.\nWhen 'Dadak-im' comes to your side, we'll let you know first."
        }
      </DialogTitle>
      <div className="flex gap-4">
        {onShowReport && (
          <Button variant="default" onClick={onShowReport}>
            {language === 'ko' ? "리포트 보러가기" : "View Report"}
          </Button>
        )}
        <Button variant="secondary" onClick={onClose}>
          {language === 'ko' ? "닫기" : "Close"}
        </Button>
      </div>
    </div>
  );
};

export default QuizDialogComplete;
