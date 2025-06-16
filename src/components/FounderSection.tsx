
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

export default FounderSection;
