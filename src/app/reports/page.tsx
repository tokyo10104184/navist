// src/app/reports/page.tsx
'use client'; // For potential future interactivity, though not strictly needed for static mock data

import LearningStatusReport, { LearningReportData } from '@/features/connected-learning/components/LearningStatusReport';
import LearningInfographic, { InfographicData } from '@/features/connected-learning/components/LearningInfographic';

const MOCK_STUDENT_NAME = "アレックス・ドウ"; // Translated student name

const mockReportData: LearningReportData = {
  studentName: MOCK_STUDENT_NAME,
  reportingPeriod: "過去30日間", // Translated
  timeSpentTotal: "25時間45分", // Translated
  subjects: [
    { name: "代数II", progress: 75, focusTime: "10時間15分" }, // Translated
    { name: "化学", progress: 60, focusTime: "8時間30分" },   // Translated
    { name: "世界史", progress: 85, focusTime: "7時間00分" }, // Translated
  ],
  recentAchievements: [
    "代数の「二次方程式」モジュールを完了。", // Translated
    "「化学結合」クイズで90%を獲得。",         // Translated
    "歴史の「ルネサンス期」を習得。",           // Translated
  ],
  areasForAttention: [
    "化学の「化学量論」の概念を復習。",       // Translated
    "歴史の小論文作成をさらに練習。",        // Translated
  ],
};

const mockInfographicData: InfographicData = {
  studentName: MOCK_STUDENT_NAME,
  timePerSubject: [
    { name: "代数", time: 10.25 },      // Translated
    { name: "化学", time: 8.5 },        // Translated
    { name: "歴史", time: 7 },          // Translated
    { name: "英語", time: 5.75 },        // Translated
  ],
  topicDistribution: [
    { name: "数学問題", value: 120 },    // Translated
    { name: "実験レポート", value: 15 }, // Translated
    { name: "読書", value: 50 },         // Translated
    { name: "クイズ", value: 25 },       // Translated
  ],
  progressOverTime: [ // Dates can be kept generic or localized too if needed
    { date: "第1週", score: 55 },
    { date: "第2週", score: 60 },
    { date: "第3週", score: 70 },
    { date: "第4週", score: 68 },
    { date: "第5週", score: 75 },
  ],
};

export default function ReportsPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <h1 className="text-3xl font-bold text-center">コネクテッドラーニング ダッシュボード</h1>

      <section aria-labelledby="status-report-title">
        <h2 id="status-report-title" className="sr-only">学習状況レポート</h2> {/* Also translate sr-only text */}
        <LearningStatusReport reportData={mockReportData} />
      </section>

      <section aria-labelledby="learning-infographic-title" className="mt-10">
        <h2 id="learning-infographic-title" className="sr-only">Learning Infographic</h2>
        <LearningInfographic infographicData={mockInfographicData} />
      </section>
    </div>
  );
}
