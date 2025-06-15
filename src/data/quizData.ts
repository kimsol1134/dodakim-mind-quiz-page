
export type Question = {
  type: "single" | "multi";
  question: string;
  options: string[];
  min?: number;
  max?: number;
};

export const QUESTIONS: Question[] = [
  {
    type: "single",
    question: "요즘 '내 마음의 에너지'는 어느 정도라고 느끼시나요?",
    options: [
      "거의 방전 상태예요.",
      "간신히 하루하루 버티고 있어요.",
      "그럭저럭 괜찮은 편이에요.",
      "에너지가 꽤 넘치는 편이에요.",
    ],
  },
  {
    type: "single",
    question: "가장 속 깊은 고민이나 힘든 감정을 편하게 터놓을 상대가 있다고 느끼시나요?",
    options: [
      "전혀 없어요.",
      "있긴 하지만, 솔직히 말하기는 어려워요.",
      "가끔 있는 편이에요.",
      "언제든 기댈 수 있는 상대가 있어요.",
    ],
  },
  {
    type: "single",
    question: "'아빠'가 아닌, 온전히 '나' 자신을 위한 시간을 일주일에 얼마나 갖고 계신가요?",
    options: [
      "거의 없다고 할 수 있어요.",
      "1시간이 채 안 돼요.",
      "가끔은 시간을 내려고 노력해요.",
      "충분히 갖고 있다고 생각해요.",
    ],
  },
  {
    type: "multi",
    question:
      "만약 '도닥임'을 사용한다면, 어떤 도움을 가장 받고 싶으신가요? (가장 중요한 것 1~2개 선택)",
    options: [
      "그냥 내 얘기를 판단 없이 들어주면 좋겠어요.",
      "스트레스나 화를 다스리는 방법을 알고 싶어요.",
      "아내와의 관계를 개선하고 싶어요.",
      "'나' 자신을 되찾고, 활력을 얻고 싶어요.",
      "다른 아빠들은 어떻게 지내는지 궁금해요.",
    ],
    min: 1,
    max: 2,
  },
];

export const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/23383502/uyvouoz/";
