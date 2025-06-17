
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  onQuizOpen: () => void;
}

const Hero: React.FC<HeroProps> = ({ onQuizOpen }) => {
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

        {/* 신뢰도 향상 통계 */}
        <div className="mt-8 mb-6 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10">
          <p className="text-white/90 text-sm mb-2">
            {t('hero.stats')}
          </p>
          <div className="flex justify-center items-center gap-6 text-xs text-white/70">
            <span>✓ {t('hero.anonymous')}</span>
            <span>✓ {t('hero.avgTime')}</span>
            <span>✓ {t('hero.participants')}</span>
          </div>
        </div>

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
          <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4" onClick={onQuizOpen}>
            {t('hero.cta')}
          </Button>
          <p className="mt-3 text-sm text-white/60">{t('hero.privacy')}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
