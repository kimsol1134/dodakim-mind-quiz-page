
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeaderProps {
  onQuizOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onQuizOpen }) => {
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
          <Button size="sm" className="px-4 py-2" onClick={onQuizOpen}>
            {t('header.diagnosis')}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
