
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface EmotionTagsProps {
  emotions: string[];
  stressors: string[];
  onRemoveEmotion: (emotion: string) => void;
  onRemoveStressor: (stressor: string) => void;
}

const emotionLabels = {
  anger: '분노',
  sadness: '슬픔',
  anxiety: '불안',
  guilt: '죄책감'
};

const stressorLabels = {
  parenting: '육아',
  work: '업무',
  relationship: '관계',
  personal: '개인시간'
};

const EmotionTags = ({ emotions, stressors, onRemoveEmotion, onRemoveStressor }: EmotionTagsProps) => {
  if (emotions.length === 0 && stressors.length === 0) return null;

  return (
    <div className="bg-secondary/30 p-4 rounded-lg mb-4">
      <h4 className="text-sm font-medium mb-2">감정 및 원인 분석</h4>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => (
          <Badge key={emotion} variant="destructive" className="flex items-center gap-1">
            #{emotionLabels[emotion as keyof typeof emotionLabels] || emotion}
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
            #{stressorLabels[stressor as keyof typeof stressorLabels] || stressor}
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
