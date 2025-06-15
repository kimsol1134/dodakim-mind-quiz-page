
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Props = {
  answers: any[];
  onClose: () => void;
};

const answerLabels = [
  [
    "거의 방전 상태예요.",
    "간신히 하루하루 버티고 있어요.",
    "그럭저럭 괜찮은 편이에요.",
    "에너지가 꽤 넘치는 편이에요.",
  ],
  [
    "전혀 없어요.",
    "있긴 하지만, 솔직히 말하기는 어려워요.",
    "가끔 있는 편이에요.",
    "언제든 기댈 수 있는 상대가 있어요.",
  ],
  [
    "거의 없다고 할 수 있어요.",
    "1시간이 채 안 돼요.",
    "가끔은 시간을 내려고 노력해요.",
    "충분히 갖고 있다고 생각해요.",
  ],
  [
    "그냥 내 얘기를 판단 없이 들어주면 좋겠어요.",
    "스트레스나 화를 다스리는 방법을 알고 싶어요.",
    "아내와의 관계를 개선하고 싶어요.",
    "'나' 자신을 되찾고, 활력을 얻고 싶어요.",
    "다른 아빠들은 어떻게 지내는지 궁금해요.",
  ],
];

function getEnergyAdvice(idx: number) {
  switch (idx) {
    case 0: return "심한 피로와 소진감을 겪고 계시네요. 일상 속에서 본인에게 휴식 시간을 꼭 허락해주셨으면 합니다.";
    case 1: return "많이 지치셨네요. 아주 작은 변화부터 시작해 본인만의 충전 루틴을 하나 제안드려요.";
    case 2: return "지금 상태를 잘 유지하려는 노력이 보여요. 가끔은 본인에게도 칭찬을 해보세요.";
    case 3: return "에너지가 충만해 보여요! 스스로를 잘 돌보고 계신 듯합니다. 이 긍정적인 흐름 계속 이어가시길.";
    default: return "";
  }
}

function getTalkAdvice(idx: number) {
  switch (idx) {
    case 0: 
      return "속마음을 나눌 상대가 없다는 점이 크게 마음에 부담을 줄 수 있습니다. 온라인 혹은 오프라인에서 믿을 만한 지지 그룹을 찾는 것도 좋은 방법입니다.";
    case 1:
      return "마음을 나누는 것이 쉽지 않겠지만, 조심스럽게 작은 감정부터 표현하는 연습을 해보세요.";
    case 2:
      return "가끔이라도 자신의 감정을 표현할 상대가 있다는 것은 큰 힘이 됩니다. 감정 대화를 조금 더 자주 가져보세요.";
    case 3:
      return "든든한 심리적 지지자가 있으셔서 마음 건강에 좋은 환경입니다. 주변 관계를 소중히 다듬어가세요.";
    default: return "";
  }
}

function getTimeForMeAdvice(idx: number) {
  switch (idx) {
    case 0:
      return "스스로만을 위한 시간이 너무 부족합니다. 아주 짧은 시간이라도 본인만을 위한 루틴 하나를 오늘부터 시도해보세요.";
    case 1:
      return "‘나’에게 쓰는 시간이 거의 없네요. 일주일에 한 번은 나에게 선물되는 시간을 마련해보면 어떨까요?";
    case 2:
      return "가끔은 내가 우선이 되는 시간도 필요합니다. 스스로에게 더 자주 그런 기회를 주세요.";
    case 3:
      return "자기만의 시간을 잘 확보하고 계시네요! 이 소중한 루틴 꼭 계속 지켜나가시길 바랍니다.";
    default: return "";
  }
}

function getNeedsTips(indices: number[]) {
  if (!Array.isArray(indices) || indices.length < 1) return null;
  const tips = [
    "판단 없이 들어줄 사람이 필요하다면, ‘감정을 표현하는 연습’부터 시작해 보세요. 일기를 써봐도 좋고 안전한 공간에서 진솔하게 털어놓는 경험이 중요합니다.",
    "화 또는 스트레스 해소법이 필요하다면, 심호흡, 간단한 산책, 기록하기 같은 즉각적 심리 기술을 익혀보시길 추천합니다.",
    "관계개선이 목표라면, 솔직한 마음을 조금씩 꺼내는 대화 훈련(“나 전달법”)을 연습해보세요.",
    "나다움을 찾고 싶다면, 내가 ‘좋아하는 것’과 ‘안 해본 것’을 목록으로 적어보고 아주 작은 취미를 실천해보는 게 도움이 됩니다.",
    "다른 아빠들과 연결을 희망한다면, 아빠 커뮤니티나 온라인 그룹에 가볍게 참여해보는 것도 큰 힘이 될 수 있습니다.",
  ];
  return indices.map(i => (
    <li key={i} className="mb-2">- {tips[i]}</li>
  ));
}

const QuizResultReport: React.FC<Props> = ({ answers, onClose }) => {
  if (!answers) return null;
  const [energy, talk, time, needs] = answers;
  return (
    <div className="flex flex-col gap-6 p-8 max-w-md">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold mb-2">상담 전문가 분석 리포트</DialogTitle>
        <DialogDescription className="text-base mb-4 text-muted-foreground">
          AI 상담 전문가의 시각으로, 당신의 답변을 분석해보았어요.<br />
          아래의 내용을 참고하시고 본인에게 맞는 조언을 실천해보세요.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-5 p-3 bg-background border rounded-lg">
        <div>
          <div className="font-bold mb-1 text-primary">1. 삶의 에너지 상태</div>
          <div className="mb-2">{answerLabels[0][energy]}</div>
          <div className="text-sm text-muted-foreground">{getEnergyAdvice(energy)}</div>
        </div>
        <div>
          <div className="font-bold mb-1 text-primary">2. 고민·감정 표현 환경</div>
          <div className="mb-2">{answerLabels[1][talk]}</div>
          <div className="text-sm text-muted-foreground">{getTalkAdvice(talk)}</div>
        </div>
        <div>
          <div className="font-bold mb-1 text-primary">3. '나'만의 시간 확보</div>
          <div className="mb-2">{answerLabels[2][time]}</div>
          <div className="text-sm text-muted-foreground">{getTimeForMeAdvice(time)}</div>
        </div>
        <div>
          <div className="font-bold mb-1 text-primary">4. 필요·희망사항 및 제안</div>
          <div className="mb-2">
            {Array.isArray(needs) && needs.length > 0 
              ? needs.map((i: number) => (<span key={i} className="inline-block bg-accent px-2 py-1 rounded mr-1 text-xs">{answerLabels[3][i]}</span>))
              : "선택 없음"}
          </div>
          <ul className="text-sm text-muted-foreground">
            {getNeedsTips(needs)}
          </ul>
        </div>
      </div>
      <Button className="mt-6" variant="secondary" onClick={onClose}>닫기</Button>
    </div>
  );
};

export default QuizResultReport;
