// src/app/api/user/stats/route.ts
import { NextResponse } from 'next/server';

interface UserStats {
  name: string;
  points: number;
  rank: string;
  avatarImage?: string;
}

const mockUserStats: UserStats = {
  name: "Alex L. (from API)",
  points: 1337,
  rank: "API Data Wrangler",
  // avatarImage: "https://example.com/avatar.png" // Optional
};

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 150)); // Simulate delay
    return NextResponse.json(mockUserStats);
  } catch (error) {
    console.error("Error in /api/user/stats GET:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
