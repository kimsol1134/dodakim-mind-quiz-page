
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, BookOpen, BarChart, User } from 'lucide-react';
import ChatInterface from '@/components/app/ChatInterface';
import DailyLog from '@/components/app/DailyLog';
import WeeklyReport from '@/components/app/WeeklyReport';
import Profile from '@/components/app/Profile';
import { useLanguage } from '@/contexts/LanguageContext';

type TabType = 'chat' | 'log' | 'report' | 'profile';

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const { t } = useLanguage();

  const tabs = [
    { id: 'chat' as TabType, label: '도닥임과 대화', icon: MessageCircle },
    { id: 'log' as TabType, label: '데일리 로그', icon: BookOpen },
    { id: 'report' as TabType, label: '주간 리포트', icon: BarChart },
    { id: 'profile' as TabType, label: '내 정보', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-secondary border-b border-border px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">도닥임</h1>
          <p className="text-sm text-white/70">당신의 마음을 위한 AI 동반자</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-secondary/50 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-background text-primary border-b-2 border-primary'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'log' && <DailyLog />}
        {activeTab === 'report' && <WeeklyReport />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  );
};

export default App;
