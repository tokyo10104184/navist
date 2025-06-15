// src/app/reports/page.tsx
'use client'; // For potential future interactivity, though not strictly needed for static mock data

import LearningStatusReport, { LearningReportData } from '@/features/connected-learning/components/LearningStatusReport';
import LearningInfographic, { InfographicData } from '@/features/connected-learning/components/LearningInfographic';

const MOCK_STUDENT_NAME = "Alex Doe";

const mockReportData: LearningReportData = {
  studentName: MOCK_STUDENT_NAME,
  reportingPeriod: "Last 30 Days",
  timeSpentTotal: "25h 45m",
  subjects: [
    { name: "Algebra II", progress: 75, focusTime: "10h 15m" },
    { name: "Chemistry", progress: 60, focusTime: "8h 30m" },
    { name: "World History", progress: 85, focusTime: "7h 00m" },
  ],
  recentAchievements: [
    "Completed 'Quadratic Equations' module in Algebra.",
    "Scored 90% on 'Chemical Bonds' quiz.",
    "Mastered 'The Renaissance Period' in History.",
  ],
  areasForAttention: [
    "Review 'Stoichiometry' concepts in Chemistry.",
    "Practice more essay writing for History.",
  ],
};

const mockInfographicData: InfographicData = {
  studentName: MOCK_STUDENT_NAME,
  timePerSubject: [
    { name: "Algebra", time: 10.25 },
    { name: "Chemistry", time: 8.5 },
    { name: "History", time: 7 },
    { name: "English", time: 5.75 },
  ],
  topicDistribution: [
    { name: "Math Problems", value: 120 },
    { name: "Lab Reports", value: 15 },
    { name: "Reading", value: 50 },
    { name: "Quizzes", value: 25 },
  ],
  progressOverTime: [
    { date: "Week 1", score: 55 },
    { date: "Week 2", score: 60 },
    { date: "Week 3", score: 70 },
    { date: "Week 4", score: 68 },
    { date: "Week 5", score: 75 },
  ],
};

export default function ReportsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-center">Connected Learning Dashboard</h1>

      <section aria-labelledby="status-report-title">
        <h2 id="status-report-title" className="sr-only">Learning Status Report</h2>
        <LearningStatusReport reportData={mockReportData} />
      </section>

      <section aria-labelledby="learning-infographic-title" className="mt-10">
        <h2 id="learning-infographic-title" className="sr-only">Learning Infographic</h2>
        <LearningInfographic infographicData={mockInfographicData} />
      </section>
    </div>
  );
}
