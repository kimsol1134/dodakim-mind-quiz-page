
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Heart, TrendingUp, Users } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SolutionSection from '@/components/SolutionSection';
import BeforeSection from '@/components/BeforeSection';
import AfterSection from '@/components/AfterSection';
import FounderSection from '@/components/FounderSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      {/* 서비스 소개 카드 */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">도닥임과 함께하세요</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              AI 상담사 도닥임이 당신의 육아 스트레스를 이해하고, 
              따뜻한 조언과 함께 마음의 평안을 찾아드립니다.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <MessageCircle className="w-8 h-8 text-primary mb-2" />
                <CardTitle>AI 상담</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  24시간 언제나 당신의 이야기를 들어드립니다. 
                  CBT 기반의 전문적인 상담을 제공합니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <CardTitle>감정 분석</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  당신의 감정 패턴을 분석하여 
                  더 나은 육아 환경을 만들어갑니다.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 border-border/50">
              <CardHeader>
                <Heart className="w-8 h-8 text-primary mb-2" />
                <CardTitle>개인 맞춤</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70">
                  당신만의 육아 스타일에 맞는 
                  개인화된 조언과 해결책을 제공합니다.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Link to="/auth">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                지금 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <SolutionSection />
      <BeforeSection />
      <AfterSection />
      <FounderSection />
      <Footer />
    </div>
  );
};

export default Index;
