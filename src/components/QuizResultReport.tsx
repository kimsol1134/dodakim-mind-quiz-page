
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
  console.log("REPORT_DATA structure:", REPORT_DATA);
  
  const overallAnalysis = generateOverallAnalysis(answers);

  // 안전한 데이터 접근을 위한 함수 - 인덱스 범위 체크 추가
  const getReportData = (category: 'energy' | 'support' | 'time', index: number) => {
    console.log(`Accessing ${category} data at index ${index}`);
    const categoryData = REPORT_DATA[category];
    console.log(`Category ${category} has ${categoryData?.length || 0} items`);
    
    if (!categoryData || index < 0 || index >= categoryData.length) {
      console.log(`Invalid index ${index} for category ${category}`);
      return {
        label: "데이터를 확인 중입니다.",
        analysis: "잠시만 기다려주세요.",
        advice: "곧 개인화된 조언을 제공해드릴게요.",
        priority: "보통"
      };
    }
    
    const data = categoryData[index];
    console.log(`Retrieved data for ${category}[${index}]:`, data);
    return data;
  };

  const energyData = getReportData('energy', energy);
  const supportData = getReportData('support', support);
  const timeData = getReportData('time', time);

  console.log("Final data:", { energyData, supportData, timeData });

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
