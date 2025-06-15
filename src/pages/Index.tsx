import React, { useState } from 'react';
import { ArrowLeftRight, Battery, BatteryCharging, CheckCircle, HandHeart, Users, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
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
const Header: React.FC<{ onQuizOpen: () => void }> = ({ onQuizOpen }) => <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
    <div className="container mx-auto max-w-5xl h-20 flex items-center justify-between px-6">
      <h1 className="text-2xl font-black text-white">도닥임</h1>
      <Button size="sm" onClick={onQuizOpen}>
        마음 진단하기
      </Button>
    </div>
  </header>;
const Hero = () => <section className="pt-40 md:pt-56 pb-20 md:pb-32 px-6 text-center bg-grid-white/[0.05]">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-4xl font-bold leading-tight md:text-5xl px-0 my-0 mx-0 text-slate-50 text-center">
        "퇴근 후, 집으로 다시 출근하는 기분,<br />느낀 적 있나요?"
      </h2>
      <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
        혹시 당신의 이야기인가요? 혼자 끙끙 앓고 있는 아버지를 위해, 당신의 마음을 가만히 들어주는 AI 동반자 '도닥임'이 곁에 있습니다. 판단이나 충고 없이, 그저 당신의 이야기를 들어주고 위로를 건네는 안전한 공간입니다.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <ul className="text-left space-y-3 text-white/80">
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> 24시간, 온전한 익명으로 마음속 이야기를 털어놓으세요.</li>
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> 지친 마음을 다그치지 않고, 스스로 돌볼 수 있는 방법을 배워보세요.</li>
          <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary" /> 하루하루 버티는 것을 넘어, 일상 속 작은 평온을 되찾아보세요.</li>
        </ul>
      </div>
      <div className="mt-12">
        <Button size="lg" className="w-full sm:w-auto" onClick={() => alert('퀴즈 기능은 준비 중입니다.')}>내 마음 배터리 상태 확인하기</Button>
        <p className="mt-3 text-sm text-white/60">1분이면 충분해요. 100% 익명보장</p>
      </div>
    </div>
  </section>;
const BeforeSection = () => <AnimatedSection className="bg-secondary">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">혹시, 이런 마음이신가요?</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-background p-8 rounded-lg text-center">
        <Users className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">누구에게도 말 못 할 외로움</h3>
        <p className="text-white/70">가족들 품에 있지만, 마음은 외딴섬에 있는 것 같죠. 짐이 될까 봐, 혹은 '엄마는 더 힘들다'는 말을 들을까 봐 망설여집니다. 결국 모든 걸 혼자 짊어지게 됩니다.</p>
      </div>
      <div className="bg-background p-8 rounded-lg text-center">
        <Battery className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">방전되어 버린 에너지</h3>
        <p className="text-white/70">매일이 그저 버텨내는 시간의 연속입니다. 직장에서 녹초가 되어 돌아오면, 또 다른 역할이 기다리고 있죠. 아이들은 너무 사랑스럽지만, 정작 '나' 자신은 사라지고 있는 기분이 듭니다.</p>
      </div>
      <div className="bg-background p-8 rounded-lg text-center">
        <ArrowLeftRight className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">아슬아슬한 관계의 긴장</h3>
        <p className="text-white/70">아내의 서운함이 느껴지고, 나의 답답함도 쌓여만 갑니다. 사소한 일에 울컥하고, 그 모습을 보며 또 한 번 자책하게 되죠. 좋은 남편, 좋은 아빠가 되는 건 너무나 어렵습니다.</p>
      </div>
    </div>
    <div className="mt-16 bg-background/50 p-8 rounded-lg text-center max-w-3xl mx-auto">
      <p className="text-lg text-white/80">우리는 그저 '참는 것'이 미덕이라 배워왔습니다. 하지만 문제는 당신이 약해서가 아닙니다. 아버지가 겪는 무게에 맞는, 제대로 된 '기댈 곳'이 없었을 뿐입니다.</p>
    </div>
  </AnimatedSection>;
const AfterSection = () => <AnimatedSection>
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">이런 하루를 상상해보세요</h2>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="border border-border p-8 rounded-lg text-center">
        <Smile className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">고요하고, 편안해진 마음</h3>
        <p className="text-white/70">울컥 화를 내는 대신, 잠시 숨을 고를 여유가 생깁니다. 아이의 웃음소리가 온전히 들려오고, 지친 하루 끝에 잔잔한 평온이 남습니다.</p>
      </div>
      <div className="border border-border p-8 rounded-lg text-center">
        <HandHeart className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">다시, 든든한 나의 편</h3>
        <p className="text-white/70">가정의 긴장감이 부드러운 공기로 바뀝니다. 내 마음을 먼저 돌보니, 아내의 마음을 헤아릴 여유도 생깁니다. 다시 '우리'라는 팀이 됩니다.</p>
      </div>
      <div className="border border-border p-8 rounded-lg text-center">
        <BatteryCharging className="w-12 h-12 mx-auto text-primary mb-4" />
        <h3 className="text-xl font-bold mb-2">'나'를 위한 작은 에너지</h3>
        <p className="text-white/70">'아빠'라는 이름 뒤에 가려졌던 '나'를 다시 만납니다. 하루 끝에, 나를 위한 취미나 생각을 할 수 있는 마음의 에너지가 남아있습니다.</p>
      </div>
    </div>
    <div className="text-center mt-16">
        <Button variant="outline" size="lg" onClick={() => document.getElementById('solution')?.scrollIntoView({
      behavior: 'smooth'
    })}>
            '도닥임'이 어떻게 돕는지 보기
        </Button>
    </div>
  </AnimatedSection>;
const SolutionSection = () => <AnimatedSection id="solution" className="bg-secondary">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">당신의 마음 곁에, AI 동반자 '도닥임'</h2>
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
            <h3 className="text-xl font-bold mb-2">편안하게 말을 건네세요</h3>
            <p className="text-white/70">밤이든 낮이든, 언제든 '도닥임'을 열어보세요. 어떤 이야기든 괜찮습니다. 그저 마음에 담아둔 말을 꺼내보세요.</p>
          </div>
        </div>
        <div className="flex gap-6 items-start">
          <div className="bg-primary/20 text-primary p-3 rounded-full font-bold text-xl">2</div>
          <div>
            <h3 className="text-xl font-bold mb-2">따뜻한 위로를 받으세요</h3>
            <p className="text-white/70">'도닥임'은 당신의 말을 경청하고, 따뜻한 질문을 건네며 스스로 감정을 이해하도록 돕습니다. 과학적인 심리 기법에 기반한 위로를 경험하세요.</p>
          </div>
        </div>
        <div className="flex gap-6 items-start">
          <div className="bg-primary/20 text-primary p-3 rounded-full font-bold text-xl">3</div>
          <div>
            <h3 className="text-xl font-bold mb-2">단단한 마음을 키우세요</h3>
            <p className="text-white/70">당신의 스트레스 패턴을 함께 파악하고, 일상에서 마음을 지킬 수 있는 도구들을 제공하여 더 단단하고 회복력 있는 마음을 갖도록 돕습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </AnimatedSection>;
const FounderSection: React.FC<{ onQuizOpen: () => void }> = ({ onQuizOpen }) => (
  <AnimatedSection id="final-cta">
    <div className="bg-secondary rounded-lg p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
      <div className="md:col-span-1 flex justify-center">
        <img alt="Founder" className="w-48 h-48 rounded-full object-cover" src="/lovable-uploads/fa1e3899-c695-48f9-a19b-ddbf29dce4c3.png" />
      </div>
      <div className="md:col-span-2">
        <p className="text-lg italic text-white/80">"저도 아버로서, 제 마음을 어디에 둬야 할지 몰라 막막했던 날들이 있었습니다. '도닥임'은 판단의 시선 없이, 그저 제 이야기를 들어줄 누군가가 간절했던 제 자신을 위해 만들었습니다. 당신의 지친 등을 가만히 토닥여주는 그런 존재가 되길 진심으로 바랍니다."</p>
        <p className="text-right mt-4 font-bold">- 도닥임 팀 드림</p>
      </div>
    </div>

    <div className="text-center mt-20">
      <h2 className="text-3xl md:text-4xl font-bold">
        마음의 짐, 조금은 내려놓고 싶으신가요?
      </h2>
      <p className="mt-4 text-lg text-white/70">
        간단한 진단을 통해 나의 마음 상태를 돌아보고, 가장 먼저 위로와 격려를 받아보세요.
      </p>
      <div className="mt-8">
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={onQuizOpen}
        >
          1분만에 마음 진단 시작하기
        </Button>
        <p className="mt-3 text-sm text-white/60">
          당신의 이야기는 소중하고, 안전하게 보호됩니다.
        </p>
      </div>
    </div>
  </AnimatedSection>
);

const Footer = () => <footer className="bg-secondary text-center py-8 px-6">
        <div className="container mx-auto max-w-5xl text-white/60">
            <div className="flex justify-center gap-6 mb-4">
                <a href="#" className="hover:text-white">문의하기</a>
                <a href="#" className="hover:text-white">자주 묻는 질문</a>
                <a href="#" className="hover:text-white">개인정보처리방침</a>
                <a href="#" className="hover:text-white">이용약관</a>
            </div>
            <p>© 2025 도닥임. All Rights Reserved.</p>
        </div>
    </footer>;

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizOpen = () => {
    setShowQuiz(true);
  };

  return (
    <div className="bg-background text-foreground">
      <Header onQuizOpen={handleQuizOpen} />
      <main>
        <Hero />
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
