
import React from "react";
import { Button } from "@/components/ui/button";
import ReportHeader from "./quiz-report/ReportHeader";
import OverallAnalysis from "./quiz-report/OverallAnalysis";
import ReportSection from "./quiz-report/ReportSection";
import CustomizedSuggestions from "./quiz-report/CustomizedSuggestions";
import { REPORT_DATA_KO, REPORT_DATA_EN } from "@/data/reportData";
import { generateOverallAnalysis } from "@/utils/reportAnalysis";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  answers: any[];
  onClose: () => void;
};

const QuizResultReport: React.FC<Props> = ({ answers, onClose }) => {
  const { language } = useLanguage();
  const REPORT_DATA = language === 'ko' ? REPORT_DATA_KO : REPORT_DATA_EN;
  
  console.log("QuizResultReport - answers:", answers);

  if (!answers || answers.length < 4) {
    return (
      <div className="flex flex-col gap-6 p-8 max-w-md">
        <p className="text-foreground">
          {language === 'ko' ? "답변 데이터를 불러올 수 없습니다." : "Unable to load answer data."}
        </p>
        <Button onClick={onClose}>
          {language === 'ko' ? "닫기" : "Close"}
        </Button>
      </div>
    );
  }

  const [energy, support, time, needs] = answers;
  
  console.log("Individual answers:", { energy, support, time, needs });
  console.log("REPORT_DATA structure:", REPORT_DATA);
  
  const overallAnalysis = generateOverallAnalysis(answers, language);

  // 한국어 답변을 인덱스로 변환하는 매핑
  const energyLabelsKo = [
    "거의 방전 상태예요.",
    "간신히 하루하루 버티고 있어요.",
    "그럭저럭 괜찮은 편이에요.",
    "에너지가 꽤 넘치는 편이에요."
  ];

  const supportLabelsKo = [
    "전혀 없어요.",
    "있긴 하지만, 솔직히 말하기는 어려워요.",
    "가끔 있는 편이에요.",
    "언제든 기댈 수 있는 상대가 있어요."
  ];

  const timeLabelsKo = [
    "거의 없다고 할 수 있어요.",
    "1시간이 채 안 돼요.",
    "가끔은 시간을 내려고 노력해요.",
    "충분히 갖고 있다고 생각해요."
  ];

  const energyLabelsEn = [
    "Almost completely drained.",
    "Barely getting through each day.",
    "Doing okay overall.",
    "Feeling quite energetic."
  ];

  const supportLabelsEn = [
    "Not at all.",
    "There is someone, but it's hard to be honest.",
    "Sometimes I do.",
    "I always have someone I can rely on."
  ];

  const timeLabelsEn = [
    "Almost none.",
    "Less than an hour.",
    "I try to make time occasionally.",
    "I think I have enough."
  ];

  // 안전한 데이터 접근을 위한 함수 - 한국어 텍스트를 인덱스로 변환
  const getReportData = (category: 'energy' | 'support' | 'time', answer: any) => {
    console.log(`Processing ${category} answer:`, answer);
    
    let index: number;
    
    // 답변이 숫자인 경우 그대로 사용
    if (typeof answer === 'number') {
      index = answer;
    } else if (typeof answer === 'string') {
      // 답변이 텍스트인 경우 해당하는 인덱스 찾기
      const labels = language === 'ko' ? 
        (category === 'energy' ? energyLabelsKo : 
         category === 'support' ? supportLabelsKo : timeLabelsKo) :
        (category === 'energy' ? energyLabelsEn : 
         category === 'support' ? supportLabelsEn : timeLabelsEn);
      
      index = labels.indexOf(answer);
    } else {
      index = -1;
    }
    
    console.log(`Converted ${category} answer "${answer}" to index: ${index}`);
    
    const categoryData = REPORT_DATA[category];
    console.log(`Category ${category} has ${categoryData?.length || 0} items`);
    
    if (!categoryData || index < 0 || index >= categoryData.length) {
      console.log(`Invalid index ${index} for category ${category}`);
      return {
        label: language === 'ko' ? "데이터를 확인 중입니다." : "Checking data.",
        analysis: language === 'ko' ? "잠시만 기다려주세요." : "Please wait a moment.",
        advice: language === 'ko' ? "곧 개인화된 조언을 제공해드릴게요." : "We'll provide personalized advice soon.",
        priority: language === 'ko' ? "보통" : "moderate"
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
          title={language === 'ko' ? "삶의 에너지 상태" : "Life Energy Status"}
          label={energyData.label}
          analysis={energyData.analysis}
          advice={energyData.advice}
          priority={energyData.priority}
        />

        <ReportSection
          icon="🤝"
          title={language === 'ko' ? "정서적 지지 환경" : "Emotional Support Environment"}
          label={supportData.label}
          analysis={supportData.analysis}
          advice={supportData.advice}
          priority={supportData.priority}
        />

        <ReportSection
          icon="⏰"
          title={language === 'ko' ? "'나'만의 시간 확보" : "Personal Time Management"}
          label={timeData.label}
          analysis={timeData.analysis}
          advice={timeData.advice}
          priority={timeData.priority}
        />

        <CustomizedSuggestions needs={needs} needsData={REPORT_DATA.needs} />
      </div>

      <Button className="mt-6" variant="secondary" onClick={onClose}>
        {language === 'ko' ? "닫기" : "Close"}
      </Button>
    </div>
  );
};

export default QuizResultReport;
