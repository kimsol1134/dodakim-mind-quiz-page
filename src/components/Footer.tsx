
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
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

export default Footer;
