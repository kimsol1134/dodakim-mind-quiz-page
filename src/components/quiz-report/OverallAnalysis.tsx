
import React from "react";

type Props = {
  overallAnalysis: string;
};

const OverallAnalysis: React.FC<Props> = ({ overallAnalysis }) => {
  return (
    <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-foreground">
      <h3 className="font-bold text-primary mb-2">💡 종합 분석</h3>
      <p className="text-sm text-foreground">{overallAnalysis}</p>
    </div>
  );
};

export default OverallAnalysis;
