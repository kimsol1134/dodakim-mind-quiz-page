
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  overallAnalysis: string;
};

const OverallAnalysis: React.FC<Props> = ({ overallAnalysis }) => {
  const { language } = useLanguage();
  
  return (
    <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
      <h3 className="font-bold text-primary mb-2">
        {language === 'ko' ? "💡 종합 분석" : "💡 Overall Analysis"}
      </h3>
      <p className="text-sm text-foreground">{overallAnalysis}</p>
    </div>
  );
};

export default OverallAnalysis;
