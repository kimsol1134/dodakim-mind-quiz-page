
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BeforeSection from '@/components/BeforeSection';
import AfterSection from '@/components/AfterSection';
import SolutionSection from '@/components/SolutionSection';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';
import QuizDialog from '@/components/QuizDialog';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizOpen = () => {
    setShowQuiz(true);
  };

  return (
    <div className="bg-background text-foreground">
      <Header onQuizOpen={handleQuizOpen} />
      <main>
        <Hero onQuizOpen={handleQuizOpen} />
        <BeforeSection />
        <AfterSection />
        <SolutionSection />
        <FounderSection onQuizOpen={handleQuizOpen} />
      </main>
      <Footer />
      <QuizDialog open={showQuiz} onOpenChange={setShowQuiz} />
    </div>
  );
};

export default Index;
