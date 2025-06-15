
import { useState } from "react";

export const useQuizState = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([
    undefined, undefined, undefined, [],
  ]);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleSelect = (qIdx: number, value: any) => {
    setAnswers((prev) => {
      const newArr = [...prev];
      newArr[qIdx] = value;
      return newArr;
    });
  };

  const handleCheckMulti = (idx: number) => {
    setAnswers((prev) => {
      const arr: number[] = Array.isArray(prev[3]) ? [...prev[3]] : [];
      if (arr.includes(idx)) {
        return prev.map((a, i) => (i === 3 ? arr.filter((i2) => i2 !== idx) : a));
      }
      if (arr.length >= 2) {
        return prev;
      }
      return prev.map((a, i) => (i === 3 ? arr.concat(idx) : a));
    });
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([undefined, undefined, undefined, []]);
    setEmail("");
    setEmailSent(false);
    setShowReport(false);
  };

  return {
    step,
    setStep,
    answers,
    email,
    setEmail,
    emailSent,
    setEmailSent,
    showReport,
    setShowReport,
    handleSelect,
    handleCheckMulti,
    resetQuiz,
  };
};
