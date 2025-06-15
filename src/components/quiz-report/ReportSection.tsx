
import React from "react";
import PriorityBadge from "./PriorityBadge";

type Props = {
  icon: string;
  title: string;
  label: string;
  analysis: string;
  advice: string;
  priority: string;
};

const ReportSection: React.FC<Props> = ({ icon, title, label, analysis, advice, priority }) => {
  console.log(`ReportSection ${title}:`, { label, analysis, advice, priority });
  
  return (
    <div className="p-3 bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <div className="font-bold text-card-foreground">{title}</div>
        <PriorityBadge priority={priority} />
      </div>
      <div className="mb-2 text-sm font-medium text-card-foreground">{label}</div>
      <div className="text-sm text-muted-foreground mb-2">{analysis}</div>
      <div className="text-sm bg-muted/20 border border-border p-2 rounded">
        <strong className="text-card-foreground">💊 처방:</strong> 
        <span className="text-card-foreground ml-1">{advice}</span>
      </div>
    </div>
  );
};

export default ReportSection;
