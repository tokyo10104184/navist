// src/app/api/reports/parental/route.ts
import { NextResponse } from 'next/server';

// Replicating structures from frontend components for the mock API response
// Ideally, these types could be shared from a common location if they are identical.
interface ApiSubjectFocus {
  name: string;
  progress: number;
  focusTime: string;
}

interface ApiLearningReportData {
  studentName: string;
  reportingPeriod: string;
  timeSpentTotal: string;
  subjects: ApiSubjectFocus[];
  recentAchievements: string[];
  areasForAttention: string[];
}

interface ApiInfographicData {
  studentName: string;
  timePerSubject: Array<{ name: string; time: number }>;
  topicDistribution: Array<{ name: string; value: number }>;
  progressOverTime: Array<{ date: string; score: number }>;
}

interface ParentalReportResponse {
  reportData: ApiLearningReportData;
  infographicData: ApiInfographicData;
}

const MOCK_API_STUDENT_NAME = "Alex Doe (API)";

const mockApiReportData: ApiLearningReportData = {
  studentName: MOCK_API_STUDENT_NAME,
  reportingPeriod: "Last 30 Days (API Data)",
  timeSpentTotal: "28h 15m",
  subjects: [
    { name: "API Algebra", progress: 80, focusTime: "12h 00m" },
    { name: "API Chemistry", progress: 65, focusTime: "9h 30m" },
    { name: "API World History", progress: 70, focusTime: "6h 45m" },
  ],
  recentAchievements: [
    "API: Completed 'Advanced Functions' module.",
    "API: Scored 88% on 'Organic Chemistry Basics'.",
  ],
  areasForAttention: [
    "API: Review 'Modern European History' for upcoming test.",
  ],
};

const mockApiInfographicData: ApiInfographicData = {
  studentName: MOCK_API_STUDENT_NAME,
  timePerSubject: [
    { name: "Algebra (API)", time: 12 },
    { name: "Chemistry (API)", time: 9.5 },
    { name: "History (API)", time: 6.75 },
  ],
  topicDistribution: [
    { name: "API Equations", value: 150 },
    { name: "API Experiments", value: 20 },
    { name: "API Essays", value: 10 },
  ],
  progressOverTime: [
    { date: "API W1", score: 60 },
    { date: "API W2", score: 65 },
    { date: "API W3", score: 62 },
    { date: "API W4", score: 70 },
    { date: "API W5", score: 78 },
  ],
};

const responsePayload: ParentalReportResponse = {
    reportData: mockApiReportData,
    infographicData: mockApiInfographicData,
};

export async function GET() {
  try {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate delay
    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Error in /api/reports/parental GET:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
