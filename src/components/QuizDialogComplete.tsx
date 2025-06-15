
import React from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QuizDialogComplete = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col gap-8 p-8 items-center justify-center">
    <DialogTitle className="text-xl text-center">
      등록이 완료되었습니다.<br />
      '도닥임'이 당신의 곁을 찾아갈 때, 가장 먼저 알려드릴게요.
    </DialogTitle>
    <Button onClick={onClose}>
      닫기
    </Button>
  </div>
);

export default QuizDialogComplete;
