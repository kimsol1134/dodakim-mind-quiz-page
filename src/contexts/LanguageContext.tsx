
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ko: {
    // Header
    'app.title': '도닥임',
    'header.diagnosis': '마음 진단하기',
    
    // Hero section
    'hero.title': '"퇴근 후, 집으로 다시 출근하는 기분,<br />느낀 적 있나요?"',
    'hero.description': '혹시 당신의 이야기인가요? 혼자 끙끙 앓고 있는 아버지를 위해, 당신의 마음을 가만히 들어주는 AI 동반자 \'도닥임\'이 곁에 있습니다. 판단이나 충고 없이, 그저 당신의 이야기를 들어주고 위로를 건네는 안전한 공간입니다.',
    'hero.feature1': '24시간, 온전한 익명으로 마음속 이야기를 털어놓으세요.',
    'hero.feature2': '지친 마음을 다그치지 않고, 스스로 돌볼 수 있는 방법을 배워보세요.',
    'hero.feature3': '하루하루 버티는 것을 넘어, 일상 속 작은 평온을 되찾아보세요.',
    'hero.cta': '내 마음 배터리 상태 확인하기',
    'hero.privacy': '1분이면 충분해요. 100% 익명보장',
    
    // Before section
    'before.title': '혹시, 이런 마음이신가요?',
    'before.loneliness.title': '누구에게도 말 못 할 외로움',
    'before.loneliness.desc': '가족들 품에 있지만, 마음은 외딴섬에 있는 것 같죠. 짐이 될까 봐, 혹은 \'엄마는 더 힘들다\'는 말을 들을까 봐 망설여집니다. 결국 모든 걸 혼자 짊어지게 됩니다.',
    'before.energy.title': '방전되어 버린 에너지',
    'before.energy.desc': '매일이 그저 버텨내는 시간의 연속입니다. 직장에서 녹초가 되어 돌아오면, 또 다른 역할이 기다리고 있죠. 아이들은 너무 사랑스럽지만, 정작 \'나\' 자신은 사라지고 있는 기분이 듭니다.',
    'before.relationship.title': '아슬아슬한 관계의 긴장',
    'before.relationship.desc': '아내의 서운함이 느껴지고, 나의 답답함도 쌓여만 갑니다. 사소한 일에 울컥하고, 그 모습을 보며 또 한 번 자책하게 되죠. 좋은 남편, 좋은 아빠가 되는 건 너무나 어렵습니다.',
    'before.summary': '우리는 그저 \'참는 것\'이 미덕이라 배워왔습니다. 하지만 문제는 당신이 약해서가 아닙니다. 아버지가 겪는 무게에 맞는, 제대로 된 \'기댈 곳\'이 없었을 뿐입니다.',
    
    // After section  
    'after.title': '이런 하루를 상상해보세요',
    'after.peace.title': '고요하고, 편안해진 마음',
    'after.peace.desc': '울컥 화를 내는 대신, 잠시 숨을 고를 여유가 생깁니다. 아이의 웃음소리가 온전히 들려오고, 지친 하루 끝에 잔잔한 평온이 남습니다.',
    'after.support.title': '다시, 든든한 나의 편',
    'after.support.desc': '가정의 긴장감이 부드러운 공기로 바뀝니다. 내 마음을 먼저 돌보니, 아내의 마음을 헤아릴 여유도 생깁니다. 다시 \'우리\'라는 팀이 됩니다.',
    'after.energy.title': '\'나\'를 위한 작은 에너지',
    'after.energy.desc': '\'아빠\'라는 이름 뒤에 가려졌던 \'나\'를 다시 만납니다. 하루 끝에, 나를 위한 취미나 생각을 할 수 있는 마음의 에너지가 남아있습니다.',
    'after.cta': '\'도닥임\'이 어떻게 돕는지 보기',
    
    // Solution section
    'solution.title': '당신의 마음 곁에, AI 동반자 \'도닥임\'',
    'solution.step1.title': '편안하게 말을 건네세요',
    'solution.step1.desc': '밤이든 낮이든, 언제든 \'도닥임\'을 열어보세요. 어떤 이야기든 괜찮습니다. 그저 마음에 담아둔 말을 꺼내보세요.',
    'solution.step2.title': '따뜻한 위로를 받으세요',
    'solution.step2.desc': '\'도닥임\'은 당신의 말을 경청하고, 따뜻한 질문을 건네며 스스로 감정을 이해하도록 돕습니다. 과학적인 심리 기법에 기반한 위로를 경험하세요.',
    'solution.step3.title': '단단한 마음을 키우세요',
    'solution.step3.desc': '당신의 스트레스 패턴을 함께 파악하고, 일상에서 마음을 지킬 수 있는 도구들을 제공하여 더 단단하고 회복력 있는 마음을 갖도록 돕습니다.',
    
    // Founder section
    'founder.quote': '"저도 아버로서, 제 마음을 어디에 둬야 할지 몰라 막막했던 날들이 있었습니다. \'도닥임\'은 판단의 시선 없이, 그저 제 이야기를 들어줄 누군가가 간절했던 제 자신을 위해 만들었습니다. 당신의 지친 등을 가만히 토닥여주는 그런 존재가 되길 진심으로 바랍니다."',
    'founder.signature': '- 도닥임 팀 드림',
    'founder.final.title': '마음의 짐, 조금은 내려놓고 싶으신가요?',
    'founder.final.desc': '간단한 진단을 통해 나의 마음 상태를 돌아보고, 가장 먼저 위로와 격려를 받아보세요.',
    'founder.final.cta': '1분만에 마음 진단 시작하기',
    'founder.final.tryButton': '도닥임 사용해보기',
    'founder.final.privacy': '당신의 이야기는 소중하고, 안전하게 보호됩니다.',
    
    // Coming Soon Dialog
    'comingSoon.title': '당신을 위한 특별한 AI 동반자를 준비하고 있어요',
    'comingSoon.subtitle': '곧 만나실 수 있도록 마지막 점검 중입니다',
    'comingSoon.complete': '완료',
    'comingSoon.progress': '개발팀이 24시간 최선을 다하고 있습니다',
    'comingSoon.launch': '예상 출시일',
    'comingSoon.launchDate': '2025년 1월 말',
    'comingSoon.waitlist': '대기자 명단',
    'comingSoon.waitlistCount': '이미 1,247명이 기다리고 있어요',
    'comingSoon.betaTitle': '베타 테스터로 가장 먼저 만나보세요',
    'comingSoon.betaDesc': '출시 알림과 얼리 액세스 혜택을 받아보세요',
    'comingSoon.emailPlaceholder': '이메일 주소를 입력해주세요',
    'comingSoon.signupButton': '알림 신청',
    'comingSoon.benefits': '✓ 무료 베타 테스트 ✓ 출시 즉시 알림 ✓ 특별 할인 혜택',
    'comingSoon.thankYou': '감사합니다!',
    'comingSoon.confirmation': '출시 소식을 가장 먼저 전해드릴게요',
    
    // Footer
    'footer.contact': '문의하기',
    'footer.faq': '자주 묻는 질문',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
    'footer.copyright': '© 2025 도닥임. All Rights Reserved.',
  },
  en: {
    // Header
    'app.title': 'Dadak-im',
    'header.diagnosis': 'Check My Mind',
    
    // Hero section
    'hero.title': '"Do you ever feel like<br />you\'re going to work again after coming home?"',
    'hero.description': 'Is this your story? For fathers who suffer alone, AI companion \'Dadak-im\' is here to quietly listen to your heart. A safe space that simply listens to your story and offers comfort without judgment or advice.',
    'hero.feature1': 'Share your inner thoughts anonymously, 24/7.',
    'hero.feature2': 'Learn ways to care for yourself without pushing your tired mind.',
    'hero.feature3': 'Beyond just surviving day by day, find small moments of peace in daily life.',
    'hero.cta': 'Check My Mind Battery Status',
    'hero.privacy': '1 minute is enough. 100% anonymity guaranteed',
    
    // Before section
    'before.title': 'Do you feel this way?',
    'before.loneliness.title': 'Loneliness You Can\'t Tell Anyone',
    'before.loneliness.desc': 'You\'re surrounded by family, but your heart feels like it\'s on a deserted island. You hesitate because you don\'t want to be a burden, or you might hear "Mom has it harder." Eventually, you end up carrying everything alone.',
    'before.energy.title': 'Completely Drained Energy',
    'before.energy.desc': 'Every day is just a series of enduring moments. When you come home exhausted from work, another role awaits you. You love your children dearly, but you feel like \'you\' yourself are disappearing.',
    'before.relationship.title': 'Precarious Relationship Tensions',
    'before.relationship.desc': 'You feel your wife\'s disappointment, and your own frustration keeps building up. You get upset over trivial things, and seeing yourself like that makes you blame yourself again. Being a good husband and a good father is so difficult.',
    'before.summary': 'We\'ve been taught that simply \'enduring\' is a virtue. But the problem isn\'t that you\'re weak. You just haven\'t had a proper \'place to lean on\' that matches the weight fathers experience.',
    
    // After section  
    'after.title': 'Imagine a day like this',
    'after.peace.title': 'A Calm and Peaceful Mind',
    'after.peace.desc': 'Instead of bursting with anger, you have the leisure to catch your breath for a moment. You can fully hear your child\'s laughter, and at the end of a tiring day, gentle peace remains.',
    'after.support.title': 'Your Reliable Partner Again',
    'after.support.desc': 'The tension at home turns into gentle air. By taking care of your own heart first, you also have the space to understand your wife\'s heart. You become a \'team\' again.',
    'after.energy.title': 'Small Energy Just for \'Me\'',
    'after.energy.desc': 'You rediscover the \'you\' that was hidden behind the name \'dad.\' At the end of the day, you have mental energy left for hobbies or thoughts just for yourself.',
    'after.cta': 'See How \'Dadak-im\' Helps',
    
    // Solution section
    'solution.title': 'By Your Heart\'s Side, AI Companion \'Dadak-im\'',
    'solution.step1.title': 'Speak Comfortably',
    'solution.step1.desc': 'Whether it\'s night or day, open \'Dadak-im\' anytime. Any story is fine. Just let out the words you\'ve kept in your heart.',
    'solution.step2.title': 'Receive Warm Comfort',
    'solution.step2.desc': '\'Dadak-im\' listens to your words, asks warm questions, and helps you understand your emotions. Experience comfort based on scientific psychological techniques.',
    'solution.step3.title': 'Build a Strong Heart',
    'solution.step3.desc': 'Together, identify your stress patterns and provide tools to protect your heart in daily life, helping you develop a stronger and more resilient mind.',
    
    // Founder section
    'founder.quote': '"As a father myself, there were days when I felt lost about where to place my heart. I created \'Dadak-im\' for myself who desperately needed someone to listen to my story without judgment. I sincerely hope it becomes an existence that gently pats your tired back."',
    'founder.signature': '- From the Dadak-im Team',
    'founder.final.title': 'Would you like to put down some of your heart\'s burden?',
    'founder.final.desc': 'Reflect on your mental state through a simple diagnosis and be the first to receive comfort and encouragement.',
    'founder.final.cta': 'Start 1-Minute Mind Diagnosis',
    'founder.final.tryButton': 'Try Dadak-im',
    'founder.final.privacy': 'Your story is precious and will be safely protected.',
    
    // Coming Soon Dialog
    'comingSoon.title': 'We\'re Preparing a Special AI Companion Just for You',
    'comingSoon.subtitle': 'Final preparations are underway so you can meet it soon',
    'comingSoon.complete': 'Complete',
    'comingSoon.progress': 'Our development team is working 24/7 to make this perfect',
    'comingSoon.launch': 'Expected Launch',
    'comingSoon.launchDate': 'End of January 2025',
    'comingSoon.waitlist': 'Waiting List',
    'comingSoon.waitlistCount': '1,247 people are already waiting',
    'comingSoon.betaTitle': 'Be the First to Try as a Beta Tester',
    'comingSoon.betaDesc': 'Get launch notifications and early access benefits',
    'comingSoon.emailPlaceholder': 'Enter your email address',
    'comingSoon.signupButton': 'Get Notified',
    'comingSoon.benefits': '✓ Free Beta Testing ✓ Instant Launch Alert ✓ Special Discount',
    'comingSoon.thankYou': 'Thank You!',
    'comingSoon.confirmation': 'We\'ll notify you first when we launch',
    
    // Footer
    'footer.contact': 'Contact Us',
    'footer.faq': 'FAQ',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2025 Dadak-im. All Rights Reserved.',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
