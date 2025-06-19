
// CBT 기반 유도 질문 데이터
export const cbtQuestions = {
  anger: [
    "그렇게 화가 났을 때, 머릿속에 어떤 생각이 스쳐 지나갔나요?",
    "혹시 '나는 아빠 자격이 없나?'와 같은 생각이 드셨나요?",
    "그 순간 가장 강하게 느낀 감정은 무엇이었나요?"
  ],
  sadness: [
    "그런 슬픔을 느꼈을 때, 어떤 생각들이 떠올랐나요?",
    "혹시 '모든 게 내 탓인가?'라는 생각이 드셨나요?",
    "그 감정이 몸에서는 어떻게 느껴졌나요?"
  ],
  anxiety: [
    "불안할 때 가장 걱정되는 것은 무엇인가요?",
    "혹시 '내가 제대로 하지 못하면 어떡하지?'라는 생각이 드셨나요?",
    "그 불안감이 어떤 상황에서 가장 심해지나요?"
  ],
  guilt: [
    "죄책감이 들 때, 자신에게 어떤 말을 하고 계시나요?",
    "혹시 '좋은 아빠라면 이렇게 하지 않았을 텐데'라는 생각이 드셨나요?",
    "그 죄책감이 정말 합리적인 것일까요?"
  ]
};

// 감정 키워드 매핑
export const emotionKeywords = {
  anger: ['화', '짜증', '분노', '열받', '빡쳐', '성질', '욱'],
  sadness: ['슬픈', '우울', '울적', '암울', '침울', '눈물', '힘들'],
  anxiety: ['불안', '걱정', '두려', '무서', '떨려', '조바심'],
  guilt: ['죄책감', '미안', '후회', '자책', '부끄']
};

// 스트레스 원인 키워드
export const stressKeywords = {
  parenting: ['육아', '아이', '아기', '기저귀', '수유', '울음', '잠', '놀아'],
  work: ['회사', '업무', '일', '직장', '상사', '야근', '피곤'],
  relationship: ['아내', '부인', '배우자', '싸움', '갈등', '대화', '이해'],
  personal: ['시간', '취미', '여가', '혼자', '쉬고', '자유']
};

// 감정 분석 함수
export const analyzeEmotion = (message: string) => {
  const emotions = [];
  const stressors = [];

  // 감정 분석
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    if (keywords.some(keyword => message.includes(keyword))) {
      emotions.push(emotion);
    }
  }

  // 스트레스 원인 분석
  for (const [stressor, keywords] of Object.entries(stressKeywords)) {
    if (keywords.some(keyword => message.includes(keyword))) {
      stressors.push(stressor);
    }
  }

  return { emotions, stressors };
};

// CBT 질문 선택 함수
export const getCBTQuestion = (emotions: string[]) => {
  if (emotions.length === 0) return null;
  
  const primaryEmotion = emotions[0] as keyof typeof cbtQuestions;
  const questions = cbtQuestions[primaryEmotion];
  
  if (!questions) return null;
  
  return questions[Math.floor(Math.random() * questions.length)];
};
