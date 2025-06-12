import React from 'react';

interface ParentReportProps {
  studentName?: string;
  studentId?: string;
  recentActivitySummary?: string;
  aiAnalysis?: string;
  // Could add more detailed data props later
}

const ParentReport: React.FC<ParentReportProps> = ({
  studentName = "Alex Doe", // Default placeholder
  studentId = "SID12345", // Default placeholder
  recentActivitySummary = "Completed 3 lessons in Math (Algebra Basics) and 1 quiz on verb conjugation (English).", // Default placeholder
  aiAnalysis = "Alex shows a strong understanding of Algebra basics, particularly linear equations. Some areas for improvement in verb tense consistency were noted in the recent English quiz.", // Default placeholder
}) => {
  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white mb-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Parent's Report</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Student Information</h3>
        <p className="text-gray-600"><strong>Name:</strong> {studentName}</p>
        <p className="text-gray-600"><strong>ID:</strong> {studentId}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity Summary</h3>
        <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{recentActivitySummary}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">AI-Powered Objective Analysis</h3>
        <div className="p-3 rounded-md bg-blue-50 border border-blue-200">
          <p className="text-blue-800 italic">"{aiAnalysis}"</p>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-400 text-center">
        Report generated on: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
};

export { ParentReport };
