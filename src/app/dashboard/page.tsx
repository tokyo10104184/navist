// src/app/dashboard/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import GoalSetter, { Goal } from '@/features/planner/components/GoalSetter';
import StudyPlanDisplay, { StudyTask } from '@/features/planner/components/StudyPlanDisplay';
import ProgressChart, { ProgressData } from '@/features/planner/components/ProgressChart';
import OverallProgress from '@/features/motivation/components/OverallProgress'; // Import new component
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Target, ListChecks, BarChart2, PieChart as PieChartIcon, Activity, Trophy, Users } from 'lucide-react';

// Mock data generation functions (ensure these are correctly defined as in previous versions)
const generateMockStudyPlan = (goal: Goal): StudyTask[] => {
  if (!goal.targetDate) return [];
  const plan: StudyTask[] = [];
  const startDate = new Date();
  const endDate = new Date(goal.targetDate);
  const currentDate = new Date(startDate);
  let idCounter = 0;

  const subjects = ['数学', '理科', '歴史', '英語'];
  const tasks = ['章を読む', '練習問題を解く', 'ノートを復習', '要約を書く'];

  while (currentDate <= endDate && plan.length < 10) {
    plan.push({
      id: String(idCounter++),
      date: new Date(currentDate).toISOString().split('T')[0],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      task: tasks[Math.floor(Math.random() * tasks.length)] + ' (' + goal.description.substring(0,15) + "...) ",
      completed: Math.random() > 0.3, // Increased chance of completion for better demo
    });
    currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 3) + 1);
  }
  return plan.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const initialProgressData: ProgressData[] = [
  { name: '数学', progress: 30 },
  { name: '理科', progress: 50 },
  { name: '歴史', progress: 20 },
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
    // Update subject-specific progress for ProgressChart (remains similar)
    const newSubjectProgress = newPlan.map(task => ({
        name: task.subject,
        progress: Math.floor(Math.random() * 50) + 20 // This might need to be more deterministic
    })).filter((value, index, self) => self.findIndex(t => t.name === value.name) === index);

    if (newSubjectProgress.length > 0) {
        setProgressData(newSubjectProgress);
    } else if (newGoal) {
        setProgressData([{name: newGoal.description.substring(0,20) + "...", progress: Math.floor(Math.random() * 30)}]);
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    const updatedPlan = studyPlan.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setStudyPlan(updatedPlan);

    // Update subject-specific progress for ProgressChart
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
    const newSubjectProgressData = Object.keys(subjectProgress).map(subject => ({
      name: subject,
      progress: Math.round((subjectProgress[subject].completed / subjectProgress[subject].total) * 100),
    }));
    if (newSubjectProgressData.length > 0) {
        setProgressData(newSubjectProgressData);
    }
  };

  // Calculate data for OverallProgress
  const overallProgressStats = useMemo(() => {
    if (!goal || studyPlan.length === 0) {
      return {
        progressPercent: 0,
        daysLeft: undefined,
        tasksCompleted: 0,
        totalTasks: 0,
        goalDescription: goal?.description
      };
    }
    const completedTasks = studyPlan.filter(task => task.completed).length;
    const totalTasks = studyPlan.length;
    const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    let daysLeft: number | undefined = undefined;
    if (goal.targetDate) {
      const diffTime = new Date(goal.targetDate).getTime() - new Date().getTime();
      daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }

    return {
      goalDescription: goal.description,
      progressPercent,
      daysLeft,
      tasksCompleted: completedTasks,
      totalTasks,
    };
  }, [goal, studyPlan]);


  useEffect(() => {
    // Potentially re-calculate subject progress if goal changes and plan is generated
    // This is already handled in handleSetGoal and toggleTaskCompletion
  }, [studyPlan]);

  return (
    <div className="space-y-8"> {/* Adjusted main spacing */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <LayoutDashboard className="mr-3 h-8 w-8 text-primary" />
          学習ダッシュボード
        </h1>
      </div>

      {/* Overall Progress Section */}
      {goal && (
        <section aria-labelledby="overall-progress-title" className="mb-8">
           <OverallProgress
            goalDescription={overallProgressStats.goalDescription}
            progressPercent={overallProgressStats.progressPercent}
            daysLeft={overallProgressStats.daysLeft}
            tasksCompleted={overallProgressStats.tasksCompleted}
            totalTasks={overallProgressStats.totalTasks}
          />
        </section>
      )}

      {/* Goal Setting Section */}
      <section aria-labelledby="goal-setting-title" className="bg-card p-6 rounded-lg shadow">
        <div className="flex items-center mb-4">
          <Target className="mr-3 h-7 w-7 text-primary" /> {/* Increased icon size and margin */}
          <h2 id="goal-setting-title" className="text-2xl font-semibold">
            学習目標の設定
          </h2>
        </div>
        <GoalSetter onSetGoal={handleSetGoal} currentGoal={goal} />
      </section>

      {goal && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Grid for plan and charts/gamification */}
          <section aria-labelledby="study-plan-title" className="lg:col-span-2 bg-card p-6 rounded-lg shadow">
            <div className="flex items-center mb-4">
              <ListChecks className="mr-3 h-7 w-7 text-primary" />
              <h2 id="study-plan-title" className="text-2xl font-semibold">
                あなたの学習スケジュール
              </h2>
            </div>
            <StudyPlanDisplay plan={studyPlan} onToggleComplete={toggleTaskCompletion} />
          </section>

          <div className="lg:col-span-1 space-y-8">
            <section aria-labelledby="progress-overview-title" className="bg-card p-6 rounded-lg shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  {chartType === 'bar' ?
                    <BarChart2 className="mr-3 h-7 w-7 text-primary" /> :
                    <PieChartIcon className="mr-3 h-7 w-7 text-primary" />
                  }
                  <h2 id="progress-overview-title" className="text-2xl font-semibold">
                    科目別進捗
                  </h2>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setChartType(chartType === 'bar' ? 'pie' : 'bar')}
                  className="self-start sm:self-center"
                >
                  {chartType === 'bar' ? '円グラフ' : '棒グラフ'}
                </Button>
              </div>
              <ProgressChart data={progressData} chartType={chartType} />
            </section>

            {/* Placeholder for future gamification cards */}
            {/*
            <section aria-labelledby="weekly-activity-title" className="bg-card p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Activity className="mr-3 h-7 w-7 text-green-500" />
                <h2 id="weekly-activity-title" className="text-2xl font-semibold">週間アクティビティ</h2>
              </div>
              <p className="text-muted-foreground">ここに週間アクティビティが表示されます。</p>
            </section>

            <section aria-labelledby="leaderboard-title" className="bg-card p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Users className="mr-3 h-7 w-7 text-yellow-500" />
                <h2 id="leaderboard-title" className="text-2xl font-semibold">ランキング</h2>
              </div>
              <p className="text-muted-foreground">ここにランキングが表示されます。</p>
            </section>

            <section aria-labelledby="achievements-title" className="bg-card p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <Trophy className="mr-3 h-7 w-7 text-amber-500" />
                <h2 id="achievements-title" className="text-2xl font-semibold">アチーブメント</h2>
              </div>
              <p className="text-muted-foreground">ここにアチーブメントが表示されます。</p>
            </section>
            */}
          </div>
        </div>
      )}
       {!goal && (
        <div className="text-center py-12 px-6 bg-card border rounded-lg shadow-sm"> {/* Increased padding */}
          <Target className="mx-auto h-16 w-16 text-primary mb-6" /> {/* Increased size and color */}
          <h3 className="text-2xl font-semibold text-foreground mb-3">目標を立てて学習を始めよう！</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            「学習目標の設定」セクションから目標を設定してください。AIがあなた専用の学習プランを作成し、進捗をトラッキングします。
          </p>
        </div>
      )}
    </div>
  );
}
