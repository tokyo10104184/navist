import React, { useState } from 'react';
import { ParentReport } from './ParentReport';
import { TeacherDashboard } from './TeacherDashboard';

const ConnectedLearning = () => {
  // Simple state to toggle between views, or could be based on user role
  const [view, setView] = useState<'parent' | 'teacher'>('parent');

  // Placeholder data - in a real app, this would come from props, context, or API
  const parentReportData = {
    studentName: "Jamie Smith",
    studentId: "SID98765",
    recentActivitySummary: "Focused on 'Introduction to Python' for 2 hours, completed 5 exercises.",
    aiAnalysis: "Jamie is quickly grasping Python syntax and shows good problem-solving skills. May need encouragement to attempt more complex challenges.",
  };

  const teacherDashboardData = {
    className: "Computer Science - Year 10",
    // students data would be more complex and fetched dynamically
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-cyan-700">Connected Learning Hub</h1>
        <p className="text-md text-gray-600">
          Bridging insights for parents, teachers, and students.
        </p>
      </header>

      {/* View Toggle Buttons - Example */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setView('parent')}
          className={`px-6 py-2 rounded-md font-semibold ${
            view === 'parent'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
          }`}
        >
          Parent View
        </button>
        <button
          onClick={() => setView('teacher')}
          className={`px-6 py-2 rounded-md font-semibold ${
            view === 'teacher'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white text-green-600 border border-green-600 hover:bg-green-50'
          }`}
        >
          Teacher View
        </button>
      </div>

      {/* Conditional Rendering based on view state */}
      {view === 'parent' && (
        <ParentReport
          studentName={parentReportData.studentName}
          studentId={parentReportData.studentId}
          recentActivitySummary={parentReportData.recentActivitySummary}
          aiAnalysis={parentReportData.aiAnalysis}
        />
      )}

      {view === 'teacher' && (
        <TeacherDashboard
          className={teacherDashboardData.className}
          // students={teacherDashboardData.students} // Default students used if not passed
        />
      )}
    </div>
  );
};

export default ConnectedLearning;
