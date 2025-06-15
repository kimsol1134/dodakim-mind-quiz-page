
import React from "react";
import { Button } from "@/components/ui/button";
import ReportHeader from "./quiz-report/ReportHeader";
import OverallAnalysis from "./quiz-report/OverallAnalysis";
import ReportSection from "./quiz-report/ReportSection";
import CustomizedSuggestions from "./quiz-report/CustomizedSuggestions";
import { REPORT_DATA } from "@/data/reportData";
import { generateOverallAnalysis } from "@/utils/reportAnalysis";

type Props = {
  answers: any[];
  onClose: () => void;
};

const QuizResultReport: React.FC<Props> = ({ answers, onClose }) => {
  console.log("QuizResultReport - answers:", answers);

  if (!answers || answers.length < 4) {
    return (
      <div className="flex flex-col gap-6 p-8 max-w-md">
        <p className="text-foreground">답변 데이터를 불러올 수 없습니다.</p>
        <Button onClick={onClose}>닫기</Button>
      </div>
    );
  }

  const [energy, support, time, needs] = answers;
  
  console.log("Individual answers:", { energy, support, time, needs });
  
  const overallAnalysis = generateOverallAnalysis(answers);

  // 안전한 데이터 접근을 위한 함수
  const getReportData = (category: 'energy' | 'support' | 'time', index: number) => {
    const data = REPORT_DATA[category]?.[index];
    console.log(`Getting ${category} data for index ${index}:`, data);
    return data || {
      label: "데이터를 불러올 수 없습니다.",
      analysis: "분석 데이터가 없습니다.",
      advice: "조언 데이터가 없습니다.",
      priority: "보통"
    };
  };

  const energyData = getReportData('energy', energy);
  const supportData = getReportData('support', support);
  const timeData = getReportData('time', time);

  return (
    <div className="flex flex-col gap-6 p-8 max-w-md bg-background text-foreground">
      <ReportHeader />
      <OverallAnalysis overallAnalysis={overallAnalysis} />

      <div className="space-y-5">
        <ReportSection
          icon="⚡"
          title="삶의 에너지 상태"
          label={energyData.label}
          analysis={energyData.analysis}
          advice={energyData.advice}
          priority={energyData.priority}
        />

        <ReportSection
          icon="🤝"
          title="정서적 지지 환경"
          label={supportData.label}
          analysis={supportData.analysis}
          advice={supportData.advice}
          priority={supportData.priority}
        />

        <ReportSection
          icon="⏰"
          title="'나'만의 시간 확보"
          label={timeData.label}
          analysis={timeData.analysis}
          advice={timeData.advice}
          priority={timeData.priority}
        />

        <CustomizedSuggestions needs={needs} needsData={REPORT_DATA.needs} />
      </div>

      <Button className="mt-6" variant="secondary" onClick={onClose}>닫기</Button>
    </div>
  );
};

export default QuizResultReport;
