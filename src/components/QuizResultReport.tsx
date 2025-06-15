
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
  if (!answers || answers.length < 4) {
    return (
      <div className="flex flex-col gap-6 p-8 max-w-md">
        <p className="text-foreground">답변 데이터를 불러올 수 없습니다.</p>
        <Button onClick={onClose}>닫기</Button>
      </div>
    );
  }

  const [energy, support, time, needs] = answers;
  const overallAnalysis = generateOverallAnalysis(answers);

  return (
    <div className="flex flex-col gap-6 p-8 max-w-md">
      <ReportHeader />
      <OverallAnalysis overallAnalysis={overallAnalysis} />

      <div className="space-y-5">
        <ReportSection
          icon="⚡"
          title="삶의 에너지 상태"
          label={REPORT_DATA.energy[energy]?.label}
          analysis={REPORT_DATA.energy[energy]?.analysis}
          advice={REPORT_DATA.energy[energy]?.advice}
          priority={REPORT_DATA.energy[energy]?.priority}
        />

        <ReportSection
          icon="🤝"
          title="정서적 지지 환경"
          label={REPORT_DATA.support[support]?.label}
          analysis={REPORT_DATA.support[support]?.analysis}
          advice={REPORT_DATA.support[support]?.advice}
          priority={REPORT_DATA.support[support]?.priority}
        />

        <ReportSection
          icon="⏰"
          title="'나'만의 시간 확보"
          label={REPORT_DATA.time[time]?.label}
          analysis={REPORT_DATA.time[time]?.analysis}
          advice={REPORT_DATA.time[time]?.advice}
          priority={REPORT_DATA.time[time]?.priority}
        />

        <CustomizedSuggestions needs={needs} needsData={REPORT_DATA.needs} />
      </div>

      <Button className="mt-6" variant="secondary" onClick={onClose}>닫기</Button>
    </div>
  );
};

export default QuizResultReport;
