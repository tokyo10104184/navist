// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import GoalSetter, { Goal } from '@/features/planner/components/GoalSetter';
import StudyPlanDisplay, { StudyTask } from '@/features/planner/components/StudyPlanDisplay';
import ProgressChart, { ProgressData } from '@/features/planner/components/ProgressChart';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Target, ListChecks, BarChart2, PieChart as PieChartIcon } from 'lucide-react'; // Added more icons

// Mock data generation functions (ensure these are correctly defined as in previous versions)
const generateMockStudyPlan = (goal: Goal): StudyTask[] => {
  if (!goal.targetDate) return [];
  const plan: StudyTask[] = [];
  const startDate = new Date();
  const endDate = new Date(goal.targetDate);
  const currentDate = new Date(startDate);
  let idCounter = 0;

  const subjects = ['数学', '理科', '歴史', '英語']; // Translated subjects
  const tasks = ['章を読む', '練習問題を解く', 'ノートを復習', '要約を書く']; // Translated tasks (base)

  while (currentDate <= endDate && plan.length < 10) {
    plan.push({
      id: String(idCounter++),
      date: new Date(currentDate).toISOString().split('T')[0],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      task: tasks[Math.floor(Math.random() * tasks.length)] + ' (' + goal.description.substring(0,15) + "...) ", // Adjusted task string
      completed: Math.random() > 0.7,
    });
    currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 3) + 1);
  }
  return plan.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const initialProgressData: ProgressData[] = [
  { name: '数学', progress: 30 }, // Translated
  { name: '理科', progress: 50 }, // Translated
  { name: '歴史', progress: 20 }, // Translated
];
// End of mock data functions

export default function DashboardPage() {
  const [goal, setGoal] = useState<Goal | undefined>(undefined);
  const [studyPlan, setStudyPlan] = useState<StudyTask[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>(initialProgressData);
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  const handleSetGoal = (newGoal: Goal) => {
    setGoal(newGoal);
    const newPlan = generateMockStudyPlan(newGoal);
    setStudyPlan(newPlan);
    const newProgress = newPlan.map(task => ({
        name: task.subject,
        progress: Math.floor(Math.random() * 50) + 20
    })).filter((value, index, self) => self.findIndex(t => t.name === value.name) === index);

    if (newProgress.length > 0) {
        setProgressData(newProgress);
    } else if (newGoal) {
        setProgressData([{name: newGoal.description.substring(0,20) + "...", progress: Math.floor(Math.random() * 30)}]);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedPlan = studyPlan.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setStudyPlan(updatedPlan);

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

  // useEffect can be kept if it had other purposes, for now it's empty.
  useEffect(() => {}, []);

  return (
    <div className="space-y-10"> {/* Increased spacing between major sections */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center">
          <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
          パーソナルAIプランナー
        </h1>
      </div>

      <section aria-labelledby="goal-setting-title">
        <div className="flex items-center mb-4">
          <Target className="mr-2 h-6 w-6 text-muted-foreground" />
          <h2 id="goal-setting-title" className="text-2xl font-semibold">
            学習目標の設定
          </h2>
        </div>
        <GoalSetter onSetGoal={handleSetGoal} currentGoal={goal} />
      </section>

      {goal && (
        <>
          <section aria-labelledby="study-plan-title">
            <div className="flex items-center mb-4">
              <ListChecks className="mr-2 h-6 w-6 text-muted-foreground" />
              <h2 id="study-plan-title" className="text-2xl font-semibold">
                あなたの学習スケジュール
              </h2>
            </div>
            <StudyPlanDisplay plan={studyPlan} onToggleComplete={toggleTaskCompletion} />
          </section>

          <section aria-labelledby="progress-overview-title">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="flex items-center mb-2 sm:mb-0">
                {chartType === 'bar' ?
                  <BarChart2 className="mr-2 h-6 w-6 text-muted-foreground" /> :
                  <PieChartIcon className="mr-2 h-6 w-6 text-muted-foreground" />
                }
                <h2 id="progress-overview-title" className="text-2xl font-semibold">
                  進捗の概要
                </h2>
              </div>
              <Button
                variant="outline"
                onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
                className="self-start sm:self-center" /* Ensures button alignment */
              >
                {chartType === 'bar' ? '円グラフに切替' : '棒グラフに切替'}
              </Button>
            </div>
            <ProgressChart data={progressData} chartType={chartType} />
          </section>
        </>
      )}
       {!goal && (
        <div className="text-center py-10 px-6 bg-card border rounded-lg shadow-sm">
          <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">目標がまだ設定されていません</h3>
          <p className="text-muted-foreground">
            上で学習目標を設定すると、個別の学習プランが生成され、進捗を確認できます。
          </p>
        </div>
      )}
    </div>
  );
}
