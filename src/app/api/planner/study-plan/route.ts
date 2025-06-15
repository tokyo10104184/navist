// src/app/api/planner/study-plan/route.ts
import { NextResponse } from 'next/server';

// Minimal StudyTask interface for API, actual one might be more complex
// For this mock, we assume a simple structure is fine.
// If using the exact same type from frontend: import type { StudyTask } from '@/features/planner/components/StudyPlanDisplay';
// However, to keep API decoupled, sometimes a separate or simplified type is used.
interface ApiStudyTask {
  id: string;
  date: string;
  subject: string;
  task: string;
  completed: boolean;
}

// Mock data generation function (similar to what was on the page)
const generateMockStudyPlanForApi = (goalDescription: string = "a new goal"): ApiStudyTask[] => {
  const plan: ApiStudyTask[] = [];
  const startDate = new Date();
  let currentDate = new Date(startDate);
  let idCounter = 0;
  const subjects = ['API Math', 'API Science', 'API History', 'API English', 'API Coding'];
  const tasks = ['Read API Chapter', 'Practice API Problems', 'Review API Notes', 'Complete API Exercise', 'Watch API Tutorial'];

  for(let i=0; i<5; i++){ // Generate 5 tasks for the mock plan
    plan.push({
      id: `api_task_${idCounter++}`,
      date: new Date(currentDate).toISOString().split('T')[0], // Format as YYYY-MM-DD
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      task: `${tasks[Math.floor(Math.random() * tasks.length)]} for "${goalDescription.substring(0,30)}..."`,
      completed: Math.random() > 0.6, // Randomly mark some as completed
    });
    // Increment date somewhat randomly for variety
    currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 3) + 1);
  }
  return plan.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const goalDescription = searchParams.get('goalDescription') || 'your studies';

    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    const studyPlan = generateMockStudyPlanForApi(goalDescription);
    return NextResponse.json(studyPlan);
  } catch (error) {
    console.error("Error in /api/planner/study-plan GET:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
