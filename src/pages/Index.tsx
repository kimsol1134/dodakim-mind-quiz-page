import React, { useState } from 'react';
import { ArrowLeftRight, Battery, BatteryCharging, CheckCircle, HandHeart, Users, Smile, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';
import QuizDialog from '@/components/QuizDialog';

const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}> = ({
  children,
  className,
  id
}) => {
  const [ref, isVisible] = useScrollAnimation();
  return <section id={id} ref={ref} className={`py-20 md:py-32 px-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'} ${className}`}>
      <div className="container mx-auto max-w-5xl">
        {children}
      </div>
    </section>;
};
const Header: React.FC<{ onQuizOpen: () => void }> = ({ onQuizOpen }) => {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto max-w-5xl h-20 flex items-center justify-between px-6">
        <h1 className="text-2xl font-black text-white">{t('app.title')}</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'ko' ? 'en' : 'ko')}
            className="text-white hover:bg-white/10"
          >
            <Globe className="w-4 h-4 mr-1" />
            {language === 'ko' ? 'English' : '한국어'}
          </Button>
          <Button size="sm" onClick={onQuizOpen}>
            {t('header.diagnosis')}
          </Button>
        </div>
      </div>
    </header>
  );
};
const Hero = ({ onQuizOpen }: { onQuizOpen: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-40 md:pt-56 pb-20 md:pb-32 px-6 text-center bg-grid-white/[0.05]">
      <div className="container mx-auto max-w-3xl">
        <h2 
          className="text-4xl font-bold leading-tight md:text-5xl px-0 my-0 mx-0 text-slate-50 text-center"
          dangerouslySetInnerHTML={{ __html: t('hero.title') }}
        />
        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ul className="text-left space-y-3 text-white/80">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" /> 
              {t('hero.feature1')}
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" /> 
              {t('hero.feature2')}
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" /> 
              {t('hero.feature3')}
            </li>
          </ul>
        </div>
        <div className="mt-12">
          <Button size="lg" className="w-full sm:w-auto" onClick={onQuizOpen}>
            {t('hero.cta')}
          </Button>
          <p className="mt-3 text-sm text-white/60">{t('hero.privacy')}</p>
        </div>
      </div>
    </section>
  );
};
const BeforeSection = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedSection className="bg-secondary">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('before.title')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-background p-8 rounded-lg text-center">
          <Users className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('before.loneliness.title')}</h3>
          <p className="text-white/70">{t('before.loneliness.desc')}</p>
        </div>
        <div className="bg-background p-8 rounded-lg text-center">
          <Battery className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('before.energy.title')}</h3>
          <p className="text-white/70">{t('before.energy.desc')}</p>
        </div>
        <div className="bg-background p-8 rounded-lg text-center">
          <ArrowLeftRight className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('before.relationship.title')}</h3>
          <p className="text-white/70">{t('before.relationship.desc')}</p>
        </div>
      </div>
      <div className="mt-16 bg-background/50 p-8 rounded-lg text-center max-w-3xl mx-auto">
        <p className="text-lg text-white/80">{t('before.summary')}</p>
      </div>
    </AnimatedSection>
  );
};
const AfterSection = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedSection>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('after.title')}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="border border-border p-8 rounded-lg text-center">
          <Smile className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('after.peace.title')}</h3>
          <p className="text-white/70">{t('after.peace.desc')}</p>
        </div>
        <div className="border border-border p-8 rounded-lg text-center">
          <HandHeart className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('after.support.title')}</h3>
          <p className="text-white/70">{t('after.support.desc')}</p>
        </div>
        <div className="border border-border p-8 rounded-lg text-center">
          <BatteryCharging className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{t('after.energy.title')}</h3>
          <p className="text-white/70">{t('after.energy.desc')}</p>
        </div>
      </div>
      <div className="text-center mt-16">
        <Button variant="outline" size="lg" onClick={() => document.getElementById('solution')?.scrollIntoView({
          behavior: 'smooth'
        })}>
          {t('after.cta')}
        </Button>
      </div>
    </AnimatedSection>
  );
};
const SolutionSection = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedSection id="solution" className="bg-secondary">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('solution.title')}</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
          <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background p-4 flex flex-col">
            <div className="flex-1 flex flex-col justify-end space-y-4">
              <div className="flex justify-end">
                <p className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                  오늘 아이 재우는 게 너무 힘들었어. 계속 칭얼거리고, 어떻게 해야 할지 모르겠더라.
                </p>
              </div>
              <div className="flex justify-start">
                <p className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[80%]">
                  아빠로서 정말 지치셨겠어요. 혹시 아이가 칭얼거릴 때 어떤 감정이 드셨나요?
                </p>
              </div>
              <div className="flex justify-end">
                <p className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                  내가 좋은 아빠가 맞나 싶고, 괜히 짜증도 났어. 아내한테 미안해지기도 하고...
                </p>
              </div>
              <div className="flex justify-start">
                <p className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[80%]">
                  그럴 때 스스로를 탓하지 않으셔도 괜찮아요. 아이의 마음과 아빠의 마음, 모두 쉽지 않죠.
                </p>
              </div>
              <div className="flex justify-end">
                <p className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                  이렇게 누군가에게 털어놓으니 마음이 조금은 놓이는 것 같아. 고마워.
                </p>
              </div>
              <div className="flex justify-start">
                <p className="bg-muted text-muted-foreground p-3 rounded-lg max-w-[80%]">
                  언제든 마음 속 이야기를 나눠주세요. 오늘도 충분히 잘하고 계신 아빠예요.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="bg-primary/20 text-primary p-3 rounded-full font-bold text-xl">1</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{t('solution.step1.title')}</h3>
              <p className="text-white/70">{t('solution.step1.desc')}</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-primary/20 text-primary p-3 rounded-full font-bold text-xl">2</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{t('solution.step2.title')}</h3>
              <p className="text-white/70">{t('solution.step2.desc')}</p>
            </div>
          </div>
          <div className="flex gap-6 items-start">
            <div className="bg-primary/20 text-primary p-3 rounded-full font-bold text-xl">3</div>
            <div>
              <h3 className="text-xl font-bold mb-2">{t('solution.step3.title')}</h3>
              <p className="text-white/70">{t('solution.step3.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
const FounderSection: React.FC<{ onQuizOpen: () => void }> = ({ onQuizOpen }) => {
  const { t } = useLanguage();
  
  return (
    <AnimatedSection id="final-cta">
      <div className="bg-secondary rounded-lg p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 flex justify-center">
          <img alt="Founder" className="w-48 h-48 rounded-full object-cover" src="/lovable-uploads/fa1e3899-c695-48f9-a19b-ddbf29dce4c3.png" />
        </div>
        <div className="md:col-span-2">
          <p className="text-lg italic text-white/80">{t('founder.quote')}</p>
          <p className="text-right mt-4 font-bold">{t('founder.signature')}</p>
        </div>
      </div>

      <div className="text-center mt-20">
        <h2 className="text-3xl md:text-4xl font-bold">
          {t('founder.final.title')}
        </h2>
        <p className="mt-4 text-lg text-white/70">
          {t('founder.final.desc')}
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={onQuizOpen}
          >
            {t('founder.final.cta')}
          </Button>
          <p className="mt-3 text-sm text-white/60">
            {t('founder.final.privacy')}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};
const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-secondary text-center py-8 px-6">
      <div className="container mx-auto max-w-5xl text-white/60">
        <div className="flex justify-center gap-6 mb-4">
          <a href="#" className="hover:text-white">{t('footer.contact')}</a>
          <a href="#" className="hover:text-white">{t('footer.faq')}</a>
          <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-white">{t('footer.terms')}</a>
        </div>
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

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
