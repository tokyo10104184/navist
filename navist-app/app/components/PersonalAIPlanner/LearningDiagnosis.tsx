import React from 'react';

interface LearningDiagnosisProps {
  // Props can be added here later, e.g., onAnalysisComplete callback
}

const LearningDiagnosis: React.FC<LearningDiagnosisProps> = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Learning Diagnosis</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="q1" className="block text-sm font-medium text-gray-600 mb-1">
            What are your primary learning goals?
          </label>
          <textarea
            id="q1"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Understand React Hooks, Learn Next.js basics"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="q2" className="block text-sm font-medium text-gray-600 mb-1">
            How much time can you dedicate per week (in hours)?
          </label>
          <input
            type="number"
            id="q2"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., 5"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="q3" className="block text-sm font-medium text-gray-600 mb-1">
            What is your current understanding of the topic?
          </label>
          <select
            id="q3"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button
          type="button" // Should be 'submit' if it's a real form, or handle onClick
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Analyze & Generate Plan
        </button>
      </form>
    </div>
  );
};

export { LearningDiagnosis };
