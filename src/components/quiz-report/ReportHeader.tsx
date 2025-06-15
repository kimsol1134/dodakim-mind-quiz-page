
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ReportHeader: React.FC = () => {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl font-bold mb-2 text-foreground">상담 전문가 분석 리포트</DialogTitle>
      <DialogDescription className="text-base mb-4 text-muted-foreground">
        AI 상담 전문가가 당신의 답변을 종합 분석했습니다.<br />
        아래 맞춤형 조언을 참고하여 실천해보세요.
      </DialogDescription>
    </DialogHeader>
  );
};

export default ReportHeader;
