
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  needs: number[];
  needsData: string[];
};

const CustomizedSuggestions: React.FC<Props> = ({ needs, needsData }) => {
  const { language } = useLanguage();
  
  const getNeedLabel = (needIndex: number) => {
    const labelsKo = ["경청", "스트레스관리", "관계개선", "자아찾기", "커뮤니티"];
    const labelsEn = ["Listening", "Stress Management", "Relationship", "Self-Discovery", "Community"];
    const labels = language === 'ko' ? labelsKo : labelsEn;
    return labels[needIndex] || "";
  };

  return (
    <div className="p-3 bg-secondary/20 border border-secondary/30 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🎯</span>
        <div className="font-bold text-foreground">
          {language === 'ko' ? "맞춤형 실천 제안" : "Customized Action Suggestions"}
        </div>
      </div>
      <div className="mb-2">
        {Array.isArray(needs) && needs.length > 0 ? (
          needs.map((needIndex: number) => (
            <span key={needIndex} className="inline-block bg-accent/30 text-foreground px-2 py-1 rounded mr-1 mb-1 text-xs border border-accent/40">
              {getNeedLabel(needIndex)}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">
            {language === 'ko' ? "선택 없음" : "No selection"}
          </span>
        )}
      </div>
      <ul className="text-sm space-y-2">
        {Array.isArray(needs) && needs.length > 0 ? needs.map((needIndex: number) => (
          <li key={needIndex} className="bg-accent/20 border border-accent/30 p-2 rounded">
            <strong className="text-foreground">
              {language === 'ko' ? "💊 처방:" : "💊 Prescription:"}
            </strong> 
            <span className="text-foreground ml-1">{needsData[needIndex]}</span>
          </li>
        )) : (
          <li className="text-sm text-muted-foreground">
            {language === 'ko' 
              ? "현재 상태를 잘 유지해 나가시면 됩니다." 
              : "You can continue to maintain your current state well."
            }
          </li>
        )}
      </ul>
    </div>
  );
};

export default CustomizedSuggestions;
