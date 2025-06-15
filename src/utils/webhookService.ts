
import { ZAPIER_WEBHOOK_URL } from "@/data/quizData";

export const sendToZapier = async (email: string, answers: any[]) => {
  try {
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify({
        email,
        answers,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (e) {
    console.error("Zapier webhook 전송 실패", e);
  }
};
