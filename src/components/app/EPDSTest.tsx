
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface EPDSTestProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

const EPDSTest: React.FC<EPDSTestProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      question: "웃을 수 있고 사물의 재미있는 면을 볼 수 있었다",
      options: [
        "예전과 마찬가지로 할 수 있었다",
        "예전보다 확실히 적게 할 수 있었다", 
        "분명히 예전보다 적게 할 수 있었다",
        "전혀 할 수 없었다"
      ]
    },
    {
      question: "사물을 즐거운 마음으로 기대하였다",
      options: [
        "예전과 마찬가지로 할 수 있었다",
        "예전보다 다소 적게 할 수 있었다",
        "분명히 예전보다 적게 할 수 있었다", 
        "거의 할 수 없었다"
      ]
    },
    {
      question: "일이 잘못 되었을 때 나 자신을 불필요하게 탓하였다",
      options: [
        "그런 적이 없었다",
        "자주 그런 적이 없었다",
        "가끔 그랬다",
        "대부분 그랬다"
      ]
    },
    {
      question: "별다른 이유 없이 불안하고 걱정이 되었다",
      options: [
        "전혀 그런 적이 없었다",
        "거의 그런 적이 없었다", 
        "가끔 그랬다",
        "매우 자주 그랬다"
      ]
    },
    {
      question: "별다른 이유 없이 무서움을 느끼고 당황하였다",
      options: [
        "전혀 그런 적이 없었다",
        "거의 그런 적이 없었다",
        "가끔 그랬다", 
        "매우 자주 그랬다"
      ]
    },
    {
      question: "해야 할 일들이 쌓여만 가는 것 같았다",
      options: [
        "예전처럼 잘 해내고 있었다",
        "예전처럼 잘 해내지 못할 때가 있었다",
        "대부분 제대로 해내지 못하고 있었다",
        "전혀 해낼 수 없었다"
      ]
    },
    {
      question: "너무 불행해서 잠을 이루기 어려웠다",
      options: [
        "전혀 그런 적이 없었다",
        "자주 그런 적은 없었다",
        "가끔 그랬다",
        "대부분 그랬다"
      ]
    },
    {
      question: "슬프거나 비참하다고 느꼈다",
      options: [
        "전혀 그런 적이 없었다",
        "자주 그런 적은 없었다", 
        "가끔 그랬다",
        "대부분 그랬다"
      ]
    },
    {
      question: "너무 불행해서 울었다",
      options: [
        "전혀 그런 적이 없었다",
        "자주 그런 적은 없었다",
        "가끔 그랬다", 
        "대부분 그랬다"
      ]
    },
    {
      question: "나 자신을 해치고 싶다는 생각이 들었다",
      options: [
        "그런 생각은 전혀 들지 않았다",
        "거의 그런 생각이 들지 않았다",
        "가끔 그런 생각이 들었다",
        "매우 자주 그런 생각이 들었다"
      ]
    }
  ];

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 점수 계산
      const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
      onComplete(totalScore);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>EPDS-P 검사 (아버지용 우울증 선별검사)</span>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-white/70">
              질문 {currentQuestion + 1} / {questions.length}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              지난 7일 동안, 당신은...
            </h3>
            <p className="text-white/80 mb-6">
              {questions[currentQuestion].question}
            </p>
          </div>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-colors ${
                  answers[currentQuestion] === index
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:bg-white/5'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전
            </Button>
            <Button
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined}
            >
              {currentQuestion === questions.length - 1 ? '완료' : '다음'}
              {currentQuestion !== questions.length - 1 && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>

          <div className="text-xs text-white/60 text-center pt-4 border-t">
            * 본 검사는 자가 진단 참고 자료이며, 의학적 진단을 대체할 수 없습니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EPDSTest;
