import React from 'react';

interface MasteryScoreProps {
  topic?: string;
  score?: number; // Score from 0 to 100
}

const MasteryScore: React.FC<MasteryScoreProps> = ({
  topic = "Algebra Chapter 2", // Default topic
  score = 75, // Default score
}) => {
  const scoreColor = score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600';
  const progressBarColor = score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold text-gray-700 mb-1">
        Mastery Score: <span className="font-normal">{topic}</span>
      </h3>
      <div className="flex items-center">
        <div className="w-full bg-gray-200 rounded-full h-4 mr-3">
          <div
            className={`${progressBarColor} h-4 rounded-full`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <span className={`text-xl font-bold ${scoreColor}`}>{score}%</span>
      </div>
      {score < 50 && (
        <p className="text-sm text-red-500 mt-2">
          Keep practicing! More review recommended.
        </p>
      )}
      {score >= 50 && score < 80 && (
        <p className="text-sm text-yellow-500 mt-2">
          Good progress! A little more review will solidify your understanding.
        </p>
      )}
      {score >= 80 && (
        <p className="text-sm text-green-500 mt-2">
          Excellent! You&apos;ve demonstrated strong mastery of this topic.
        </p>
      )}
    </div>
  );
};

export { MasteryScore };
