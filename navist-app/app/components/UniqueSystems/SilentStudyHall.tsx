import React from 'react';

interface StudySpotProps {
  spotNumber: number;
  avatarPlaceholder?: React.ReactNode;
  studyTime?: string; // e.g., "45 min"
  progress?: string; // e.g., "Chapter 3"
  isOccupied?: boolean;
}

const DefaultAvatar: React.FC = () => (
  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center shadow-md">
    <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
    </svg>
  </div>
);

const StudySpot: React.FC<StudySpotProps> = ({
  spotNumber,
  avatarPlaceholder = <DefaultAvatar />,
  studyTime = "0 min",
  progress = "Getting started",
  isOccupied = false,
}) => {
  return (
    <div className={`p-4 border rounded-lg shadow-md ${isOccupied ? 'bg-green-50' : 'bg-gray-100'} flex flex-col items-center`}>
      <div className="mb-3">
        {isOccupied ? avatarPlaceholder : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center shadow-inner">
            <span className="text-xs text-gray-400">Empty</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Desk #{spotNumber}</h3>
      {isOccupied ? (
        <>
          <p className="text-xs text-green-600">Study Time: {studyTime}</p>
          <p className="text-xs text-green-500">Focus: {progress}</p>
        </>
      ) : (
        <p className="text-xs text-gray-400 italic">Available</p>
      )}
    </div>
  );
};

const SilentStudyHall = () => {
  // Placeholder data for study spots
  const spots = [
    { spotNumber: 1, isOccupied: true, studyTime: "52 min", progress: "Calculus Ch. 2" },
    { spotNumber: 2, isOccupied: false },
    { spotNumber: 3, isOccupied: true, studyTime: "27 min", progress: "History Notes" },
    { spotNumber: 4, isOccupied: true, studyTime: "1h 15min", progress: "React Tutorial" },
    { spotNumber: 5, isOccupied: false },
    { spotNumber: 6, isOccupied: true, studyTime: "38 min", progress: "Essay Draft" },
  ];

  return (
    <div className="p-6 bg-indigo-50 min-h-screen">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700">Silent Study Hall</h1>
        <p className="text-md text-gray-600">
          A virtual space for focused, uninterrupted study.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {spots.map(spot => (
          <StudySpot
            key={spot.spotNumber}
            spotNumber={spot.spotNumber}
            isOccupied={spot.isOccupied}
            studyTime={spot.studyTime}
            progress={spot.progress}
            // avatarPlaceholder could be customized per spot if needed
          />
        ))}
      </div>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Remember, this is a silent study zone. Focus on your tasks.</p>
        <p>No chat functionality is available here.</p>
      </footer>
    </div>
  );
};

export default SilentStudyHall;
