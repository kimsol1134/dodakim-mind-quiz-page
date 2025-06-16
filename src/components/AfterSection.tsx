
import React from 'react';
import { BatteryCharging, HandHeart, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';

const AfterSection: React.FC = () => {
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

export default AfterSection;
