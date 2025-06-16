
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedSection from './AnimatedSection';

const SolutionSection: React.FC = () => {
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

export default SolutionSection;
