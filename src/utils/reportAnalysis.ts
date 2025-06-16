
export const generateOverallAnalysis = (answers: any[], language: 'ko' | 'en' = 'ko') => {
  const [energy, support, time, needs] = answers;
  const priorities = [];
  
  if (energy === 0 || energy === 1) {
    priorities.push(language === 'ko' ? "에너지 회복" : "energy recovery");
  }
  if (support === 0 || support === 1) {
    priorities.push(language === 'ko' ? "정서적 지지" : "emotional support");
  }
  if (time === 0 || time === 1) {
    priorities.push(language === 'ko' ? "개인 시간 확보" : "personal time management");
  }
  
  let analysis = "";
  if (priorities.length >= 2) {
    analysis = language === 'ko' 
      ? `현재 ${priorities.join(", ")} 영역에서 도움이 필요한 상황입니다. `
      : `You currently need help in ${priorities.join(", ")} areas. `;
  } else if (priorities.length === 1) {
    analysis = language === 'ko'
      ? `${priorities[0]} 영역에 집중적으로 관심을 기울이시면 좋을 것 같습니다. `
      : `It would be good to focus attention on ${priorities[0]}. `;
  } else {
    analysis = language === 'ko'
      ? "전반적으로 균형잡힌 상태를 유지하고 계십니다. "
      : "You are maintaining a generally balanced state. ";
  }
  
  // 긍정적 요소 찾기
  const positives = [];
  if (energy >= 2) {
    positives.push(language === 'ko' ? "충분한 에너지" : "sufficient energy");
  }
  if (support >= 2) {
    positives.push(language === 'ko' ? "좋은 지지 관계" : "good support relationships");
  }
  if (time >= 2) {
    positives.push(language === 'ko' ? "적절한 개인 시간" : "adequate personal time");
  }
  
  if (positives.length > 0) {
    analysis += language === 'ko'
      ? `${positives.join(", ")}를 잘 관리하고 계신 것은 큰 강점입니다.`
      : `Managing ${positives.join(", ")} well is a great strength.`;
  }
  
  return analysis;
};
