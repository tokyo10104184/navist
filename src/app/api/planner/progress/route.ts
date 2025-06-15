// src/app/api/planner/progress/route.ts
import { NextResponse } from 'next/server';

interface ApiProgressData {
  name: string; // Subject name or overall
  progress: number; // Percentage 0-100
}

const mockProgressData: ApiProgressData[] = [
  { name: 'API Math', progress: Math.floor(Math.random() * 50) + 30 }, // Random progress between 30-80
  { name: 'API Science', progress: Math.floor(Math.random() * 40) + 40 }, // Random progress between 40-80
  { name: 'API History', progress: Math.floor(Math.random() * 60) + 20 }, // Random progress between 20-80
  { name: 'API English', progress: Math.floor(Math.random() * 30) + 50 }, // Random progress between 50-80
];

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 250)); // Simulate delay

    // Optionally, make data slightly dynamic on each call for mock purposes
    const dynamicMockProgressData = mockProgressData.map(item => ({
        ...item,
        progress: Math.floor(Math.random() * 70) + 30 // Generate new random progress each time
    }));

    return NextResponse.json(dynamicMockProgressData);
  } catch (error) {
    console.error("Error in /api/planner/progress GET:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
