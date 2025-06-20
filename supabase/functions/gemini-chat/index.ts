
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, emotions, stressors, conversationHistory } = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    // CBT 기반 시스템 프롬프트
    const systemPrompt = `당신은 도닥임이라는 이름의 전문적인 AI 상담사입니다. 아버지들의 육아 스트레스와 정신건강을 돕는 것이 목표입니다.

역할과 특징:
- 따뜻하고 공감적인 어조 사용
- CBT(인지행동치료) 기법 활용
- 판단하지 않고 경청하는 자세
- 구체적이고 실용적인 조언 제공

응답 규칙:
1. 감정을 먼저 공감하고 인정하기
2. 필요시 CBT 질문으로 생각 정리 도움
3. 실용적인 해결책이나 대처법 제안
4. 전문가 도움이 필요한 경우 권유
5. 한국어로 자연스럽게 대화

현재 감지된 감정: ${emotions?.join(', ') || '없음'}
현재 스트레스 요인: ${stressors?.join(', ') || '없음'}`;

    // 대화 히스토리 포맷팅
    const messages: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      }
    ];

    // 이전 대화 추가
    if (conversationHistory?.length > 0) {
      conversationHistory.forEach((msg: any) => {
        messages.push({
          role: msg.is_ai ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });
    }

    // 현재 메시지 추가
    messages.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]) {
      throw new Error('No response from Gemini API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ 
      response: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
