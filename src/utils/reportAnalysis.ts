
export const generateOverallAnalysis = (answers: any[]) => {
  const [energy, support, time, needs] = answers;
  const priorities = [];
  
  if (energy === 0 || energy === 1) priorities.push("에너지 회복");
  if (support === 0 || support === 1) priorities.push("정서적 지지");
  if (time === 0 || time === 1) priorities.push("개인 시간 확보");
  
  let analysis = "";
  if (priorities.length >= 2) {
    analysis = `현재 ${priorities.join(", ")} 영역에서 도움이 필요한 상황입니다. `;
  } else if (priorities.length === 1) {
    analysis = `${priorities[0]} 영역에 집중적으로 관심을 기울이시면 좋을 것 같습니다. `;
  } else {
    analysis = "전반적으로 균형잡힌 상태를 유지하고 계십니다. ";
  }
  
  // 긍정적 요소 찾기
  const positives = [];
  if (energy >= 2) positives.push("충분한 에너지");
  if (support >= 2) positives.push("좋은 지지 관계");
  if (time >= 2) positives.push("적절한 개인 시간");
  
  if (positives.length > 0) {
    analysis += `${positives.join(", ")}를 잘 관리하고 계신 것은 큰 강점입니다.`;
  }
  
  return analysis;
};
