// src/app/api/ai/chat/route.ts
import { NextResponse } from 'next/server';

const AI_PERSONALITIES_SERVER = ['Friendly', 'Logical', 'Energetic', 'Calm', 'Socratic'];

export async function POST(request: Request) {
  try {
    const { message, personality, action } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const currentPersonality = AI_PERSONALITIES_SERVER.includes(personality) ? personality : AI_PERSONALITIES_SERVER[0];

    if (action === 'SET_GOAL') {
      // Simple validation for learning goal
      if (message.trim().length < 5) { // Example: require at least 5 characters
        return NextResponse.json({
          reply: `(${currentPersonality} AI): もう少し詳しく学習内容を教えていただけますか？例えば、「〇〇の教科書P10～P15を読む」など具体的に書いてもらえると嬉しいです。`,
          goalNeedsRefinement: true,
        });
      }
      // Goal is considered valid by this simple check
      return NextResponse.json({
        reply: `(${currentPersonality} AI): 「${message}」ですね、素晴らしい目標です！タイマーの準備をしますね。準備ができたら下の「タイマー開始」ボタンを押してください。`,
        goalConfirmed: true,
        showTimerButton: true, // Instruct frontend to show the timer button
      });
    } else { // Default to 'CHAT' action
      const responseText = `(${currentPersonality} AI): 「${message}」についてですね。これは通常のチャット応答のダミーです。`;
      return NextResponse.json({ reply: responseText });
    }

  } catch (error) {
    console.error("Error in /api/ai/chat:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
