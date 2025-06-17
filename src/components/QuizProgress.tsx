
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>{currentStep} / {totalSteps}</span>
        <span>{Math.round(progressPercentage)}%</span>
      </div>
      <Progress value={progressPercentage} className="h-2" />
    </div>
  );
};

export default QuizProgress;
