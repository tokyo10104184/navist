import React from 'react';

// Removed empty interface CurriculumDisplayProps

const CurriculumDisplay: React.FC = () => { // Changed to React.FC
  // Placeholder data
  const dailyTasks = [
    { id: 1, text: 'Read Chapter 1 of "React Deep Dive"', completed: true },
    { id: 2, text: 'Complete 2 coding exercises on Hooks', completed: false },
    { id: 3, text: 'Watch tutorial on Next.js routing', completed: false },
  ];

  const weeklyTasks = [
    { id: 1, text: 'Build a small project with React and Next.js', completed: false },
    { id: 2, text: 'Review week\'s concepts', completed: true },
  ];

  const monthlyGoals = [
    { id: 1, text: 'Deploy a full-stack Next.js application', completed: false },
    { id: 2, text: 'Contribute to an open-source project', completed: false },
  ];

  const overallProgress = 35; // Example progress percentage

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Personalized Curriculum</h2>

      {/* Progress Bar */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-1">{overallProgress}% complete</p>
      </div>

      {/* Daily Tasks */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Daily Tasks</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          {dailyTasks.map(task => (
            <li key={task.id} className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Weekly Tasks */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Weekly Tasks</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          {weeklyTasks.map(task => (
            <li key={task.id} className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {task.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly Goals */}
      <div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">Monthly Goals</h3>
        <ul className="list-disc list-inside pl-2 space-y-1">
          {monthlyGoals.map(goal => (
            <li key={goal.id} className={`${goal.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              {goal.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { CurriculumDisplay };
