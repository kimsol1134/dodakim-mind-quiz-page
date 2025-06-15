
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
  return (
    <div className="p-3 bg-card border border-border rounded-lg text-foreground">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <div className="font-bold">{title}</div>
        <PriorityBadge priority={priority} />
      </div>
      <div className="mb-2 text-sm font-medium">{label}</div>
      <div className="text-sm text-muted-foreground mb-2">{analysis}</div>
      <div className="text-sm bg-blue-50 dark:bg-blue-950 p-2 rounded border border-blue-300 dark:border-blue-800">
        <strong>💊 처방:</strong> <span>{advice}</span>
      </div>
    </div>
  );
};

export default ReportSection;
