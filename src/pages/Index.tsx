import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import QuizDialog from '@/components/app/QuizDialog';
import ComingSoonDialog from '@/components/app/ComingSoonDialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, HeartHandshake, BrainCircuit, Lightbulb, ShieldCheck, Users2, GraduationCap, Gem, Code2, MessageSquare, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { t } = useLanguage();

  const handleQuizComplete = () => {
    setShowComingSoon(true);
  };

  const Header = () => (
    <header className="py-6 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          도닥임
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#before" className="text-gray-300 hover:text-white transition">
                {t('landing.before')}
              </a>
            </li>
            <li>
              <a href="#solution" className="text-gray-300 hover:text-white transition">
                {t('landing.solution')}
              </a>
            </li>
            <li>
              <a href="#after" className="text-gray-300 hover:text-white transition">
                {t('landing.after')}
              </a>
            </li>
            <li>
              <a href="#founder" className="text-gray-300 hover:text-white transition">
                {t('landing.founder')}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );

  const Hero = () => (
    <div className="container mx-auto px-8 text-center">
      <h1 className="text-5xl font-extrabold text-white mb-6">
        {t('landing.heroTitle')}
      </h1>
      <p className="text-xl text-purple-200 mb-8">
        {t('landing.heroSubtitle')}
      </p>
    </div>
  );

  const BeforeSection = () => (
    <section id="before" className="py-16 bg-purple-800 bg-opacity-20">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {t('landing.beforeTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title={t('landing.beforeCard1Title')}
            description={t('landing.beforeCard1Description')}
            icon={Sparkles}
          />
          <Card
            title={t('landing.beforeCard2Title')}
            description={t('landing.beforeCard2Description')}
            icon={HeartHandshake}
          />
          <Card
            title={t('landing.beforeCard3Title')}
            description={t('landing.beforeCard3Description')}
            icon={BrainCircuit}
          />
        </div>
      </div>
    </section>
  );

  const SolutionSection = () => (
    <section id="solution" className="py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {t('landing.solutionTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title={t('landing.solutionCard1Title')}
            description={t('landing.solutionCard1Description')}
            icon={Lightbulb}
          />
          <Card
            title={t('landing.solutionCard2Title')}
            description={t('landing.solutionCard2Description')}
            icon={ShieldCheck}
          />
          <Card
            title={t('landing.solutionCard3Title')}
            description={t('landing.solutionCard3Description')}
            icon={Users2}
          />
        </div>
      </div>
    </section>
  );

  const AfterSection = () => (
    <section id="after" className="py-16 bg-blue-800 bg-opacity-20">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {t('landing.afterTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            title={t('landing.afterCard1Title')}
            description={t('landing.afterCard1Description')}
            icon={GraduationCap}
          />
          <Card
            title={t('landing.afterCard2Title')}
            description={t('landing.afterCard2Description')}
            icon={Gem}
          />
          <Card
            title={t('landing.afterCard3Title')}
            description={t('landing.afterCard3Description')}
            icon={Code2}
          />
        </div>
      </div>
    </section>
  );

  const FounderSection = () => (
    <section id="founder" className="py-16">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          {t('landing.founderTitle')}
        </h2>
        <p className="text-purple-200 text-lg mb-8">
          {t('landing.founderDescription')}
        </p>
        <div className="flex justify-center">
          <div className="w-40 h-40 rounded-full bg-gray-700">
            {/* Founder Image */}
          </div>
        </div>
        <p className="text-white mt-4">
          {t('landing.founderName')}
        </p>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className="py-8 bg-indigo-900 bg-opacity-30">
      <div className="container mx-auto px-8 text-center">
        <p className="text-gray-400">
          © 2024 도닥임. All rights reserved.
        </p>
      </div>
    </footer>
  );

  interface CardProps {
    title: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  const Card: React.FC<CardProps> = ({ title, description, icon: Icon }) => (
    <div className="bg-purple-700 bg-opacity-40 p-6 rounded-lg">
      <Icon className="w-6 h-6 text-white mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <Hero />
        
        {/* CTA Button 업데이트 */}
        <div className="text-center mt-12">
          <Link to="/auth">
            <Button size="lg" className="text-lg px-8 py-4 bg-white text-purple-900 hover:bg-gray-100">
              지금 시작하기
            </Button>
          </Link>
          <p className="text-purple-200 mt-4 text-sm">
            무료로 시작 • 카드 등록 불필요
          </p>
        </div>
      </section>

      <BeforeSection />
      <SolutionSection />
      <AfterSection />
      <FounderSection />
      <Footer />

      <QuizDialog 
        isOpen={showQuiz} 
        onClose={() => setShowQuiz(false)}
        onComplete={handleQuizComplete}
      />
      
      <ComingSoonDialog 
        isOpen={showComingSoon} 
        onClose={() => setShowComingSoon(false)} 
      />
    </div>
  );
};

export default Index;
