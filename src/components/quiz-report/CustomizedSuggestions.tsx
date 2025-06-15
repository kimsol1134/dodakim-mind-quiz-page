
import React from "react";

type Props = {
  needs: number[];
  needsData: string[];
};

const CustomizedSuggestions: React.FC<Props> = ({ needs, needsData }) => {
  const getNeedLabel = (needIndex: number) => {
    const labels = ["경청", "스트레스관리", "관계개선", "자아찾기", "커뮤니티"];
    return labels[needIndex] || "";
  };

  return (
    <div className="p-3 bg-card border border-border rounded-lg text-foreground">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🎯</span>
        <div className="font-bold">맞춤형 실천 제안</div>
      </div>
      <div className="mb-2">
        {Array.isArray(needs) && needs.length > 0 ? (
          needs.map((needIndex: number) => (
            <span key={needIndex} className="inline-block bg-accent/50 text-foreground px-2 py-1 rounded mr-1 mb-1 text-xs border border-accent">
              {getNeedLabel(needIndex)}
            </span>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">선택 없음</span>
        )}
      </div>
      <ul className="text-sm space-y-2">
        {Array.isArray(needs) && needs.length > 0 ? needs.map((needIndex: number) => (
          <li key={needIndex} className="bg-blue-50 dark:bg-blue-950 p-2 rounded border border-blue-300 dark:border-blue-800">
            <strong>💊 처방:</strong> <span>{needsData[needIndex]}</span>
          </li>
        )) : (
          <li className="text-sm text-muted-foreground">현재 상태를 잘 유지해 나가시면 됩니다.</li>
        )}
      </ul>
    </div>
  );
};

export default CustomizedSuggestions;
