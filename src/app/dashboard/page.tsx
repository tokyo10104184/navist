// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import GoalSetter, { Goal } from '@/features/planner/components/GoalSetter';
import StudyPlanDisplay, { StudyTask } from '@/features/planner/components/StudyPlanDisplay';
import ProgressChart, { ProgressData } from '@/features/planner/components/ProgressChart';
import { Button } from '@/components/ui/button'; // For chart type toggle

// Mock data generation
const generateMockStudyPlan = (goal: Goal): StudyTask[] => {
  if (!goal.targetDate) return [];
  const plan: StudyTask[] = [];
  const startDate = new Date();
  const endDate = new Date(goal.targetDate);
  let currentDate = new Date(startDate);
  let idCounter = 0;

  const subjects = ['Math', 'Science', 'History', 'English'];
  const tasks = ['Read Chapter', 'Practice Problems', 'Review Notes', 'Write Summary'];

  while (currentDate <= endDate && plan.length < 10) { // Limit to 10 tasks for MVP
    plan.push({
      id: String(idCounter++),
      date: new Date(currentDate).toISOString().split('T')[0], // YYYY-MM-DD
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      task: tasks[Math.floor(Math.random() * tasks.length)] + ' for ' + goal.description.substring(0,20) + "...",
      completed: Math.random() > 0.7, // Randomly mark some as completed
    });
    currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 3) + 1); // Add 1-3 days
  }
  return plan.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const initialProgressData: ProgressData[] = [
  { name: 'Math', progress: 30 },
  { name: 'Science', progress: 50 },
  { name: 'History', progress: 20 },
];

export default function DashboardPage() {
  const [goal, setGoal] = useState<Goal | undefined>(undefined);
  const [studyPlan, setStudyPlan] = useState<StudyTask[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>(initialProgressData);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const handleSetGoal = (newGoal: Goal) => {
    setGoal(newGoal);
    const newPlan = generateMockStudyPlan(newGoal);
    setStudyPlan(newPlan);
    // Update progress data based on new plan (simplified)
    const newProgress = newPlan.map(task => ({
        name: task.subject,
        progress: Math.floor(Math.random() * 50) + 20 // Random progress for new subjects
    })).filter((value, index, self) => self.findIndex(t => t.name === value.name) === index); // Unique subjects

    if (newProgress.length > 0) {
        setProgressData(newProgress);
    } else if (goal) { // if no tasks in plan, show some generic progress for the goal
        setProgressData([{name: goal.description.substring(0,20) + "...", progress: Math.floor(Math.random() * 30)}]);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedPlan = studyPlan.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setStudyPlan(updatedPlan);

    // Update progress chart based on completed tasks
    const subjectProgress: { [key: string]: { completed: number; total: number } } = {};
    updatedPlan.forEach(task => {
      if (!subjectProgress[task.subject]) {
        subjectProgress[task.subject] = { completed: 0, total: 0 };
      }
      subjectProgress[task.subject].total++;
      if (task.completed) {
        subjectProgress[task.subject].completed++;
      }
    });

    const newProgressData = Object.keys(subjectProgress).map(subject => ({
      name: subject,
      progress: Math.round((subjectProgress[subject].completed / subjectProgress[subject].total) * 100),
    }));
    if (newProgressData.length > 0) {
        setProgressData(newProgressData);
    }
  };

  useEffect(() => {
    // Add shadcn/ui components if not already present by previous steps
    // npx shadcn-ui@latest add input button textarea
    // (This should be done by the subtask execution environment)
  }, []);


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Personal AI Planner</h1>

      <section aria-labelledby="goal-setting-title">
        <h2 id="goal-setting-title" className="text-2xl font-semibold mb-3">Set Your Learning Goal</h2>
        <GoalSetter onSetGoal={handleSetGoal} currentGoal={goal} />
      </section>

      {goal && (
        <>
          <section aria-labelledby="study-plan-title">
            <h2 id="study-plan-title" className="text-2xl font-semibold mb-3">Your Study Schedule</h2>
            <StudyPlanDisplay plan={studyPlan} onToggleComplete={toggleTaskCompletion} />
          </section>

          <section aria-labelledby="progress-overview-title">
            <div className="flex justify-between items-center mb-3">
                <h2 id="progress-overview-title" className="text-2xl font-semibold">Progress Overview</h2>
                <Button variant="outline" onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}>
                    Switch to {chartType === 'bar' ? 'Pie' : 'Bar'} Chart
                </Button>
            </div>
            <ProgressChart data={progressData} chartType={chartType} />
          </section>
        </>
      )}
    </div>
  );
}
