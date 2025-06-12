import React from 'react';
import { LearningDiagnosis } from './LearningDiagnosis';
import { CurriculumDisplay } from './CurriculumDisplay';

const PersonalAIPlanner = () => {
  // State and logic for managing diagnosis and curriculum can be added here
  // For example, a state to show curriculum only after diagnosis is complete
  const [diagnosisComplete] = React.useState(false); // setDiagnosisComplete removed

  // const handleAnalysisComplete = () => { // REMOVED as unused
  //   // This would be triggered by the LearningDiagnosis component
  //   // setDiagnosisComplete(true); // This was the usage
  // };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">Personal AI Learning Planner</h1>
        <p className="text-md text-gray-600">
          Let&apos;s tailor a learning plan just for you!
        </p>
      </header>

      {/*
        Pass `handleAnalysisComplete` to LearningDiagnosis if you want to link them,
        or manage state via a shared context/store.
        If the functionality to set diagnosisComplete is needed, it can be done directly:
        Example: <LearningDiagnosis onAnalysisComplete={() => { /* logic to update diagnosisComplete directly or via a new state setter if re-enabled */ }} />
        For now, diagnosisComplete is hardcoded to its initial state (false).
        To make it interactive again, `setDiagnosisComplete` would need to be reintroduced and called.
      */}
      <LearningDiagnosis />

      {/* Conditionally render CurriculumDisplay or a placeholder */}
      {diagnosisComplete ? (
        <CurriculumDisplay />
      ) : (
        <div className="mt-6 p-4 text-center border rounded-lg shadow-md bg-white">
          <p className="text-gray-500">
            Complete the diagnosis above to generate your personalized curriculum.
          </p>
        </div>
      )}
    </div>
  );
};

export default PersonalAIPlanner;
