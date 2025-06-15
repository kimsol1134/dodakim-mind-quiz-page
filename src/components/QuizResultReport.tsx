
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  answers: any[];
  onClose: () => void;
};

// 미리 작성된 리포트 데이터
const REPORT_DATA = {
  energy: [
    {
      label: "거의 방전 상태예요.",
      analysis: "심한 피로와 소진감을 겪고 계시네요.",
      advice: "일상 속에서 본인에게 휴식 시간을 꼭 허락해주셨으면 합니다. 10분이라도 혼자만의 시간을 가져보세요.",
      priority: "긴급"
    },
    {
      label: "간신히 하루하루 버티고 있어요.",
      analysis: "많이 지치셨네요. 번아웃 상태가 우려됩니다.",
      advice: "아주 작은 변화부터 시작해 본인만의 충전 루틴을 하나 만들어보세요. 산책이나 음악 듣기 같은 간단한 것도 좋습니다.",
      priority: "높음"
    },
    {
      label: "그럭저럭 괜찮은 편이에요.",
      analysis: "지금 상태를 잘 유지하려는 노력이 보여요.",
      advice: "현재의 균형을 잘 유지하고 계십니다. 가끔은 본인에게도 칭찬을 해보세요.",
      priority: "보통"
    },
    {
      label: "에너지가 꽤 넘치는 편이에요.",
      analysis: "에너지가 충만해 보여요! 스스로를 잘 돌보고 계신 듯합니다.",
      advice: "이 긍정적인 흐름을 계속 이어가시길 바랍니다. 주변 사람들에게도 좋은 영향을 주고 계실 것 같아요.",
      priority: "양호"
    }
  ],
  support: [
    {
      label: "전혀 없어요.",
      analysis: "속마음을 나눌 상대가 없다는 점이 크게 마음에 부담을 줄 수 있습니다.",
      advice: "온라인 혹은 오프라인에서 믿을 만한 지지 그룹을 찾는 것도 좋은 방법입니다. 아빠 커뮤니티나 상담 서비스를 고려해보세요.",
      priority: "긴급"
    },
    {
      label: "있긴 하지만, 솔직히 말하기는 어려워요.",
      analysis: "마음을 나누는 것이 쉽지 않으시겠지만, 조심스럽게 시작해볼 필요가 있습니다.",
      advice: "작은 감정부터 표현하는 연습을 해보세요. '오늘 좀 힘들었어'라는 간단한 표현부터 시작해보세요.",
      priority: "높음"
    },
    {
      label: "가끔 있는 편이에요.",
      analysis: "가끔이라도 자신의 감정을 표현할 상대가 있다는 것은 큰 힘이 됩니다.",
      advice: "감정 대화를 조금 더 자주 가져보세요. 상대방도 당신의 솔직함을 감사하게 여길 것입니다.",
      priority: "보통"
    },
    {
      label: "언제든 기댈 수 있는 상대가 있어요.",
      analysis: "든든한 심리적 지지자가 있으셔서 마음 건강에 좋은 환경입니다.",
      advice: "주변 관계를 소중히 다듬어가세요. 당신도 누군가에게 그런 지지자가 되어주고 계실 것입니다.",
      priority: "양호"
    }
  ],
  time: [
    {
      label: "거의 없다고 할 수 있어요.",
      analysis: "스스로만을 위한 시간이 너무 부족합니다. 이는 장기적으로 번아웃으로 이어질 수 있습니다.",
      advice: "아주 짧은 시간이라도 본인만을 위한 루틴 하나를 오늘부터 시도해보세요. 5분 명상이나 좋아하는 음료 마시기도 좋습니다.",
      priority: "긴급"
    },
    {
      label: "1시간이 채 안 돼요.",
      analysis: "'나'에게 쓰는 시간이 거의 없네요. 자기 돌봄이 부족한 상태입니다.",
      advice: "일주일에 한 번은 나에게 선물되는 시간을 마련해보면 어떨까요? 혼자만의 산책이나 독서 시간을 가져보세요.",
      priority: "높음"
    },
    {
      label: "가끔은 시간을 내려고 노력해요.",
      analysis: "가끔은 내가 우선이 되는 시간도 필요합니다. 노력하고 계신 모습이 보입니다.",
      advice: "스스로에게 더 자주 그런 기회를 주세요. 죄책감 없이 나만의 시간을 가질 권리가 있습니다.",
      priority: "보통"
    },
    {
      label: "충분히 갖고 있다고 생각해요.",
      analysis: "자기만의 시간을 잘 확보하고 계시네요! 훌륭한 자기관리 능력입니다.",
      advice: "이 소중한 루틴을 꼭 계속 지켜나가시길 바랍니다. 다른 아빠들에게도 좋은 모범이 되실 것 같아요.",
      priority: "양호"
    }
  ],
  needs: [
    "판단 없이 들어줄 사람이 필요하다면, '감정을 표현하는 연습'부터 시작해 보세요. 일기를 써봐도 좋고 안전한 공간에서 진솔하게 털어놓는 경험이 중요합니다.",
    "화 또는 스트레스 해소법이 필요하다면, 심호흡, 간단한 산책, 기록하기 같은 즉각적 심리 기술을 익혀보시길 추천합니다.",
    "관계개선이 목표라면, 솔직한 마음을 조금씩 꺼내는 대화 훈련('나 전달법')을 연습해보세요.",
    "'나다움'을 찾고 싶다면, 내가 '좋아하는 것'과 '안 해본 것'을 목록으로 적어보고 아주 작은 취미를 실천해보는 게 도움이 됩니다.",
    "다른 아빠들과 연결을 희망한다면, 아빠 커뮤니티나 온라인 그룹에 가볍게 참여해보는 것도 큰 힘이 될 수 있습니다."
  ]
};

// 전체적인 종합 분석 생성
const generateOverallAnalysis = (answers: any[]) => {
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

const QuizResultReport: React.FC<Props> = ({ answers, onClose }) => {
  if (!answers || answers.length < 4) {
    return (
      <div className="flex flex-col gap-6 p-8 max-w-md">
        <p className="text-foreground">답변 데이터를 불러올 수 없습니다.</p>
        <Button onClick={onClose}>닫기</Button>
      </div>
    );
  }

  const [energy, support, time, needs] = answers;
  const overallAnalysis = generateOverallAnalysis(answers);

  return (
    <div className="flex flex-col gap-6 p-8 max-w-md text-foreground">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold mb-2 text-foreground">상담 전문가 분석 리포트</DialogTitle>
        <DialogDescription className="text-base mb-4 text-muted-foreground">
          AI 상담 전문가가 당신의 답변을 종합 분석했습니다.<br />
          아래 맞춤형 조언을 참고하여 실천해보세요.
        </DialogDescription>
      </DialogHeader>

      {/* 종합 분석 */}
      <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <h3 className="font-bold text-primary mb-2">💡 종합 분석</h3>
        <p className="text-sm text-foreground">{overallAnalysis}</p>
      </div>

      <div className="space-y-5">
        {/* 에너지 상태 */}
        <div className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⚡</span>
            <div className="font-bold text-foreground">삶의 에너지 상태</div>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              REPORT_DATA.energy[energy]?.priority === '긴급' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              REPORT_DATA.energy[energy]?.priority === '높음' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              REPORT_DATA.energy[energy]?.priority === '보통' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {REPORT_DATA.energy[energy]?.priority}
            </span>
          </div>
          <div className="mb-2 text-sm font-medium text-foreground">{REPORT_DATA.energy[energy]?.label}</div>
          <div className="text-sm text-muted-foreground mb-2">{REPORT_DATA.energy[energy]?.analysis}</div>
          <div className="text-sm bg-blue-50 dark:bg-blue-900/30 p-2 rounded border">
            <strong className="text-foreground">💊 처방:</strong> <span className="text-foreground">{REPORT_DATA.energy[energy]?.advice}</span>
          </div>
        </div>

        {/* 정서적 지지 */}
        <div className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🤝</span>
            <div className="font-bold text-foreground">정서적 지지 환경</div>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              REPORT_DATA.support[support]?.priority === '긴급' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              REPORT_DATA.support[support]?.priority === '높음' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              REPORT_DATA.support[support]?.priority === '보통' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {REPORT_DATA.support[support]?.priority}
            </span>
          </div>
          <div className="mb-2 text-sm font-medium text-foreground">{REPORT_DATA.support[support]?.label}</div>
          <div className="text-sm text-muted-foreground mb-2">{REPORT_DATA.support[support]?.analysis}</div>
          <div className="text-sm bg-blue-50 dark:bg-blue-900/30 p-2 rounded border">
            <strong className="text-foreground">💊 처방:</strong> <span className="text-foreground">{REPORT_DATA.support[support]?.advice}</span>
          </div>
        </div>

        {/* 개인 시간 */}
        <div className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⏰</span>
            <div className="font-bold text-foreground">'나'만의 시간 확보</div>
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              REPORT_DATA.time[time]?.priority === '긴급' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              REPORT_DATA.time[time]?.priority === '높음' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              REPORT_DATA.time[time]?.priority === '보통' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {REPORT_DATA.time[time]?.priority}
            </span>
          </div>
          <div className="mb-2 text-sm font-medium text-foreground">{REPORT_DATA.time[time]?.label}</div>
          <div className="text-sm text-muted-foreground mb-2">{REPORT_DATA.time[time]?.analysis}</div>
          <div className="text-sm bg-blue-50 dark:bg-blue-900/30 p-2 rounded border">
            <strong className="text-foreground">💊 처방:</strong> <span className="text-foreground">{REPORT_DATA.time[time]?.advice}</span>
          </div>
        </div>

        {/* 맞춤형 제안 */}
        <div className="p-3 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <div className="font-bold text-foreground">맞춤형 실천 제안</div>
          </div>
          <div className="mb-2">
            {Array.isArray(needs) && needs.length > 0 ? (
              needs.map((needIndex: number) => (
                <span key={needIndex} className="inline-block bg-accent/50 text-foreground px-2 py-1 rounded mr-1 mb-1 text-xs border">
                  {needIndex === 0 ? "경청" : needIndex === 1 ? "스트레스관리" : needIndex === 2 ? "관계개선" : needIndex === 3 ? "자아찾기" : "커뮤니티"}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">선택 없음</span>
            )}
          </div>
          <ul className="text-sm space-y-2">
            {Array.isArray(needs) && needs.length > 0 ? needs.map((needIndex: number) => (
              <li key={needIndex} className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded border">
                <strong className="text-foreground">💊 처방:</strong> <span className="text-foreground">{REPORT_DATA.needs[needIndex]}</span>
              </li>
            )) : (
              <li className="text-sm text-muted-foreground">현재 상태를 잘 유지해 나가시면 됩니다.</li>
            )}
          </ul>
        </div>
      </div>

      <Button className="mt-6" variant="secondary" onClick={onClose}>닫기</Button>
    </div>
  );
};

export default QuizResultReport;
