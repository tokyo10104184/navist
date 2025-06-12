import React from 'react';

interface GamificationElementsProps {
  points?: number;
  avatarUrl?: string; // URL to an avatar image
  leaderboardData?: Array<{ id: string; name: string; score: number }>;
}

// Placeholder data if not provided via props
const defaultLeaderboard = [
  { id: '1', name: 'UserAlpha', score: 1500 },
  { id: '2', name: 'BetaLearner', score: 1350 },
  { id: '3', name: 'Current User', score: 1200 }, // Example current user
  { id: '4', name: 'GammaAchiever', score: 1100 },
  { id: '5', name: 'DeltaSeeker', score: 950 },
];

const GamificationElements: React.FC<GamificationElementsProps> = ({
  points = 1200, // Default points
  avatarUrl,
  leaderboardData = defaultLeaderboard,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Progress & Standing</h2>

      {/* Points Display */}
      <div className="mb-4 text-center">
        <p className="text-2xl font-bold text-green-600">Points: {points}</p>
      </div>

      {/* Avatar Display */}
      <div className="mb-6 flex flex-col items-center">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Your Avatar</h3>
        {avatarUrl ? (
          <img src={avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full shadow-md object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
            <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div>
        <h3 className="text-lg font-medium text-gray-600 mb-2 text-center">Leaderboard</h3>
        <ul className="space-y-2">
          {leaderboardData.map((user, index) => (
            <li
              key={user.id}
              className={`flex justify-between items-center p-3 rounded-md ${
                user.name === 'Current User' ? 'bg-blue-100 border border-blue-300' : 'bg-gray-50'
              }`}
            >
              <span className="font-medium text-gray-700">
                {index + 1}. {user.name}
              </span>
              <span className="font-semibold text-blue-600">{user.score} pts</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { GamificationElements };
