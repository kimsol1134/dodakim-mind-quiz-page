
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Mail, Calendar, Users, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ComingSoonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ComingSoonDialog: React.FC<ComingSoonDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        onOpenChange(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            {t('comingSoon.title')}
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-base">
            {t('comingSoon.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Section */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="text-3xl font-bold text-primary">85%</div>
              <div className="text-sm text-slate-400">{t('comingSoon.complete')}</div>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-sm text-slate-400 mt-2">{t('comingSoon.progress')}</p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <div className="text-white font-medium">{t('comingSoon.launch')}</div>
                <div className="text-sm text-slate-400">{t('comingSoon.launchDate')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <div className="text-white font-medium">{t('comingSoon.waitlist')}</div>
                <div className="text-sm text-slate-400">{t('comingSoon.waitlistCount')}</div>
              </div>
            </div>
          </div>

          {/* Email Signup */}
          {!isSubscribed ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {t('comingSoon.betaTitle')}
                </h3>
                <p className="text-slate-400 text-sm">
                  {t('comingSoon.betaDesc')}
                </p>
              </div>
              
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder={t('comingSoon.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="px-6">
                  {t('comingSoon.signupButton')}
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  {t('comingSoon.benefits')}
                </p>
              </div>
            </form>
          ) : (
            <div className="text-center p-6 bg-green-900/20 rounded-lg border border-green-700">
              <div className="text-green-400 text-lg font-semibold mb-2">
                {t('comingSoon.thankYou')}
              </div>
              <p className="text-green-300 text-sm">
                {t('comingSoon.confirmation')}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoonDialog;
