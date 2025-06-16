
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const ReportHeader: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <DialogHeader>
      <DialogTitle className="text-xl font-bold mb-2 text-foreground">
        {language === 'ko' ? "상담 전문가 분석 리포트" : "Professional Analysis Report"}
      </DialogTitle>
      <DialogDescription className="text-base mb-4 text-muted-foreground">
        {language === 'ko' 
          ? "AI 상담 전문가가 당신의 답변을 종합 분석했습니다.\n아래 맞춤형 조언을 참고하여 실천해보세요."
          : "AI counseling experts have comprehensively analyzed your responses.\nPlease refer to the customized advice below and try to implement it."
        }
      </DialogDescription>
    </DialogHeader>
  );
};

export default ReportHeader;
