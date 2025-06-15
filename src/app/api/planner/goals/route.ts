// src/app/api/planner/goals/route.ts
import { NextResponse } from 'next/server';

interface Goal {
  description: string;
  targetDate: string;
}

// Simple in-memory storage for the goal (resets on server restart)
let storedGoal: Goal | null = null;

const defaultGoal: Goal = {
  description: "Master Next.js API Routes",
  targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
};

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay
  return NextResponse.json(storedGoal || defaultGoal);
}

export async function POST(request: Request) {
  try {
    const goal: Goal = await request.json();

    if (!goal || !goal.description || !goal.targetDate) {
      return NextResponse.json({ error: 'Goal description and target date are required' }, { status: 400 });
    }

    // Validate date format if necessary (e.g., using a library or regex)
    // For this mock, we'll assume it's a valid date string.

    storedGoal = goal;
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay

    return NextResponse.json(storedGoal);
  } catch (error) {
    console.error("Error in /api/planner/goals POST:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
