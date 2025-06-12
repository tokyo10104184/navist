import React from 'react';

interface SubjectHour {
  subject: string;
  hours: number;
  color?: string; // Optional color for bar chart
}

interface ShareableInfographicProps {
  userName?: string;
  weekStartDate?: Date;
  subjectHours?: SubjectHour[];
  problemsSolved?: number;
  focusTime?: number; // in hours
}

const defaultSubjectHours: SubjectHour[] = [
  { subject: 'Mathematics', hours: 5, color: 'bg-blue-500' },
  { subject: 'Physics', hours: 3, color: 'bg-green-500' },
  { subject: 'Chemistry', hours: 2.5, color: 'bg-yellow-500' },
  { subject: 'Literature', hours: 4, color: 'bg-purple-500' },
  { subject: 'History', hours: 2, color: 'bg-red-500' },
];

const ShareableInfographic: React.FC<ShareableInfographicProps> = ({
  userName = "Alex Learner",
  weekStartDate = new Date(new Date().setDate(new Date().getDate() - 7)), // Default to one week ago
  subjectHours = defaultSubjectHours,
  problemsSolved = 75,
  focusTime = 16.5,
}) => {
  const endDate = new Date(weekStartDate);
  endDate.setDate(weekStartDate.getDate() + 6);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const maxHours = Math.max(...subjectHours.map(sh => sh.hours), 0) || 1; // Avoid division by zero

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-sky-400 to-indigo-600 text-white rounded-xl shadow-2xl max-w-2xl mx-auto font-sans">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">{userName}&apos;s Weekly Learning Log</h1>
        <p className="text-lg md:text-xl text-sky-100">
          {formatDate(weekStartDate)} - {formatDate(endDate)}
        </p>
      </header>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Subject-wise Study Hours */}
        <div>
          <h2 className="text-xl font-semibold mb-3 text-sky-50">Time Spent per Subject:</h2>
          <div className="p-4 bg-black bg-opacity-20 rounded-lg space-y-2">
            {subjectHours.map(item => (
              <div key={item.subject} className="flex items-center">
                <span className="w-1/3 text-sm md:text-base">{item.subject}</span>
                <div className="w-2/3 bg-gray-700 rounded-full h-5 md:h-6 overflow-hidden">
                  <div
                    className={`${item.color || 'bg-sky-300'} h-full flex items-center justify-end pr-2 text-xs md:text-sm font-medium text-black`}
                    style={{ width: `${(item.hours / maxHours) * 100}%` }}
                  >
                    {item.hours}h
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-black bg-opacity-20 rounded-lg">
            <h3 className="text-lg font-semibold text-sky-100">Problems Solved</h3>
            <p className="text-4xl font-bold text-green-300 drop-shadow-md">{problemsSolved}</p>
          </div>
          <div className="p-4 bg-black bg-opacity-20 rounded-lg">
            <h3 className="text-lg font-semibold text-sky-100">Total Focus Time</h3>
            <p className="text-4xl font-bold text-yellow-300 drop-shadow-md">{focusTime} <span className="text-2xl">hours</span></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-sm text-sky-200">Powered by <span className="font-bold">Navist</span></p>
        <p className="text-xs text-sky-300">Keep up the great work!</p>
      </footer>
    </div>
  );
};

export default ShareableInfographic;
