
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmotionTagsProps {
  emotions: string[];
  stressors: string[];
  onRemoveEmotion: (emotion: string) => void;
  onRemoveStressor: (stressor: string) => void;
}

const EmotionTags = ({ emotions, stressors, onRemoveEmotion, onRemoveStressor }: EmotionTagsProps) => {
  const { language, t } = useLanguage();

  const emotionLabels = {
    ko: {
      anger: '분노',
      sadness: '슬픔',
      anxiety: '불안',
      guilt: '죄책감'
    },
    en: {
      anger: 'Anger',
      sadness: 'Sadness',
      anxiety: 'Anxiety',
      guilt: 'Guilt'
    }
  };

  const stressorLabels = {
    ko: {
      parenting: '육아',
      work: '업무',
      relationship: '관계',
      personal: '개인시간'
    },
    en: {
      parenting: 'Parenting',
      work: 'Work',
      relationship: 'Relationship',
      personal: 'Personal Time'
    }
  };

  if (emotions.length === 0 && stressors.length === 0) return null;

  return (
    <div className="bg-secondary/30 p-4 rounded-lg mb-4">
      <h4 className="text-sm font-medium mb-2">{t('chat.emotionAnalysis')}</h4>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => (
          <Badge key={emotion} variant="destructive" className="flex items-center gap-1">
            #{emotionLabels[language as keyof typeof emotionLabels][emotion as keyof typeof emotionLabels.ko] || emotion}
            <button
              onClick={() => onRemoveEmotion(emotion)}
              className="ml-1 hover:opacity-70"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {stressors.map((stressor) => (
          <Badge key={stressor} variant="outline" className="flex items-center gap-1">
            #{stressorLabels[language as keyof typeof stressorLabels][stressor as keyof typeof stressorLabels.ko] || stressor}
            <button
              onClick={() => onRemoveStressor(stressor)}
              className="ml-1 hover:opacity-70"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default EmotionTags;
