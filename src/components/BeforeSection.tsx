
import React from 'react';
import { ArrowLeftRight, Battery, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedSection from './AnimatedSection';

const BeforeSection: React.FC = () => {
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

export default BeforeSection;
