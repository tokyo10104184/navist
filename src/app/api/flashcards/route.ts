// src/app/api/flashcards/route.ts
import { NextResponse } from 'next/server';

interface ApiFlashcard {
  id: string;
  question: string;
  answer: string;
}

const MOCK_FLASHCARDS: ApiFlashcard[] = [
  { id: 'api_alg1', question: '[API] What is 2+2?', answer: '4' },
  { id: 'api_sci1', question: '[API] What is the boiling point of water in Celsius?', answer: '100°C' },
  { id: 'api_hist1', question: '[API] Who discovered America (for Europeans)?', answer: 'Christopher Columbus (in 1492)' },
  { id: 'api_code1', question: '[API] What does `typeof null` return in JavaScript?', answer: 'object (this is a well-known quirk)' },
  { id: 'api_geo1', question: '[API] What is the tallest mountain in the world?', answer: 'Mount Everest' },
];

export async function GET() {
  try {
    // Simulate some processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return NextResponse.json(MOCK_FLASHCARDS);
  } catch (error) {
    console.error("Error in /api/flashcards GET:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
