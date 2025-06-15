// src/app/api/ai/chat/route.ts
import { NextResponse } from 'next/server';

// Server-side list of personalities if needed for validation or default
const AI_PERSONALITIES_SERVER = ['Friendly', 'Logical', 'Energetic', 'Calm', 'Socratic'];

export async function POST(request: Request) {
  try {
    const { message, personality } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Use passed personality; if invalid or not provided, use a default.
    const currentPersonality = AI_PERSONALITIES_SERVER.includes(personality) ? personality : AI_PERSONALITIES_SERVER[0];

    const responseText = `(${currentPersonality} Mock AI): You sent: "${message}". This is a response from the mock API.`;

    return NextResponse.json({ reply: responseText });
  } catch (error) {
    console.error("Error in /api/ai/chat:", error);
    // It's good practice to avoid sending detailed error messages to the client in production
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
