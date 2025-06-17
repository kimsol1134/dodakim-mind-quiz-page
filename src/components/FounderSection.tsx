
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';

interface FounderSectionProps {
  onQuizOpen: () => void;
}

const FounderSection: React.FC<FounderSectionProps> = ({ onQuizOpen }) => {
  const { t } = useLanguage();
  
  return (
    <AnimatedSection id="final-cta">
      {/* 전문가 팀 소개 */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          {t('team.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-secondary/50 rounded-lg p-6 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('team.doctor.name')}</h3>
            <p className="text-white/70 text-sm">{t('team.doctor.title')}</p>
            <p className="text-white/60 text-xs mt-2">{t('team.doctor.desc')}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-6 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('team.scientist.name')}</h3>
            <p className="text-white/70 text-sm">{t('team.scientist.title')}</p>
            <p className="text-white/60 text-xs mt-2">{t('team.scientist.desc')}</p>
          </div>
        </div>
      </div>

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
            className="w-full sm:w-auto text-lg px-8 py-4"
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

export default FounderSection;
