
// 감정 분석 함수
export const analyzeEmotion = (text: string) => {
  const emotions: string[] = [];
  const stressors: string[] = [];

  // 감정 키워드 (한국어 + 영어)
  const emotionKeywords = {
    anger: ['화', '분노', '짜증', '열받', 'angry', 'mad', 'frustrated', 'irritated'],
    sadness: ['슬픈', '우울', '울적', 'sad', 'depressed', 'down', 'blue'],
    anxiety: ['불안', '걱정', '두려운', 'anxious', 'worried', 'nervous', 'afraid'],
    guilt: ['죄책감', '미안', '잘못', 'guilt', 'guilty', 'sorry', 'regret']
  };

  // 스트레스 원인 키워드 (한국어 + 영어)
  const stressorKeywords = {
    parenting: ['아이', '육아', '기저귀', '잠', '울음', 'child', 'baby', 'parenting', 'diaper', 'crying'],
    work: ['회사', '업무', '일', '직장', 'work', 'job', 'office', 'boss'],
    relationship: ['아내', '남편', '부부', '관계', 'wife', 'husband', 'spouse', 'relationship'],
    personal: ['시간', '취미', '휴식', 'time', 'hobby', 'rest', 'personal']
  };

  // 감정 분석
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()))) {
      emotions.push(emotion);
    }
  }

  // 스트레스 원인 분석
  for (const [stressor, keywords] of Object.entries(stressorKeywords)) {
    if (keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()))) {
      stressors.push(stressor);
    }
  }

  return { emotions, stressors };
};

// CBT 질문 생성 함수 (언어 지원 추가)
export const getCBTQuestion = (emotions: string[], language: string = 'ko'): string | null => {
  if (emotions.length === 0) return null;

  const cbtQuestions = {
    ko: {
      anger: [
        "그렇게 화가 났을 때, 머릿속에 어떤 생각이 스쳐 지나갔나요?",
        "화를 낼 수밖에 없었던 상황이라고 생각하시나요?",
        "그 순간, 다른 관점에서 상황을 바라볼 여유가 있었을까요?"
      ],
      sadness: [
        "슬픈 마음이 들 때, 자신에게 어떤 말을 해주고 계시나요?",
        "이런 기분이 영원히 계속될 것 같다는 생각이 드시나요?",
        "과거에 비슷한 기분에서 벗어났던 경험이 있으신가요?"
      ],
      anxiety: [
        "불안할 때 가장 먼저 떠오르는 생각은 무엇인가요?",
        "걱정하고 있는 일이 실제로 일어날 가능성은 얼마나 될까요?",
        "최악의 상황이 일어난다면, 어떻게 대처할 수 있을까요?"
      ],
      guilt: [
        "죄책감이 들 때, 자신에게 어떤 말을 하고 계시나요?",
        "혹시 '좋은 아빠라면 이렇게 하지 않았을 텐데'라는 생각이 드셨나요?",
        "그 죄책감이 정말 합리적인 것일까요?"
      ]
    },
    en: {
      anger: [
        "When you felt so angry, what thoughts crossed your mind?",
        "Do you think it was a situation where you had no choice but to get angry?",
        "In that moment, did you have the space to look at the situation from a different perspective?"
      ],
      sadness: [
        "When you feel sad, what do you say to yourself?",
        "Do you feel like this mood will continue forever?",
        "Have you had experiences of getting out of similar feelings in the past?"
      ],
      anxiety: [
        "When you're anxious, what's the first thought that comes to mind?",
        "How likely is it that what you're worrying about will actually happen?",
        "If the worst-case scenario happens, how could you cope with it?"
      ],
      guilt: [
        "When you feel guilty, what do you say to yourself?",
        "Do you ever think 'A good father wouldn't do this'?",
        "Is that guilt really rational?"
      ]
    }
  };

  const primaryEmotion = emotions[0];
  const questions = cbtQuestions[language as keyof typeof cbtQuestions]?.[primaryEmotion as keyof typeof cbtQuestions.ko];
  
  if (questions && questions.length > 0) {
    return questions[Math.floor(Math.random() * questions.length)];
  }

  return null;
};
