
import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  onClose: () => void;
  onShowReport?: () => void;
};

const QuizDialogComplete = ({ onClose, onShowReport }: Props) => (
  <div className="flex flex-col gap-8 p-8 items-center justify-center">
    <DialogTitle className="text-xl text-center">
      등록이 완료되었습니다.<br />
      '도닥임'이 당신의 곁을 찾아갈 때, 가장 먼저 알려드릴게요.
    </DialogTitle>
    <div className="flex gap-4">
      {onShowReport && (
        <Button variant="default" onClick={onShowReport}>
          리포트 보러가기
        </Button>
      )}
      <Button variant="secondary" onClick={onClose}>
        닫기
      </Button>
    </div>
  </div>
);

export default QuizDialogComplete;
