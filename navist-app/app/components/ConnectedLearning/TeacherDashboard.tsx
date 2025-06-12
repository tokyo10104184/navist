import React from 'react';

interface StudentProgress {
  id: string;
  name: string;
  overallProgress: number; // Percentage
  lastActivity: string;
  needsAttention?: boolean;
}

interface TeacherDashboardProps {
  className?: string; // e.g. "History 101"
  students?: StudentProgress[];
}

const defaultStudents: StudentProgress[] = [
  { id: 's1', name: 'Alice Johnson', overallProgress: 85, lastActivity: 'Completed "WWII Causes" module', needsAttention: false },
  { id: 's2', name: 'Bob Williams', overallProgress: 40, lastActivity: 'Struggling with "Algebraic Equations"', needsAttention: true },
  { id: 's3', name: 'Charlie Brown', overallProgress: 92, lastActivity: 'Aced "Photosynthesis Quiz"', needsAttention: false },
  { id: 's4', name: 'Diana Miller', overallProgress: 60, lastActivity: 'Reviewing "Chemical Bonds"', needsAttention: true },
  { id: 's5', name: 'Ethan Davis', overallProgress: 78, lastActivity: 'Practicing "Shakespearean Sonnets"', needsAttention: false },
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  className = "Grade 5 - Mathematics",
  students = defaultStudents,
}) => {
  const studentsNeedingAttention = students.filter(s => s.needsAttention);

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-2 text-green-700">Teacher's Dashboard</h2>
      <p className="text-md text-gray-600 mb-6">Class: {className}</p>

      {/* Students Needing Attention */}
      {studentsNeedingAttention.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-300 rounded-md">
          <h3 className="text-xl font-semibold text-yellow-700 mb-3">Students Needing Attention ⚠️</h3>
          <ul className="space-y-2">
            {studentsNeedingAttention.map(student => (
              <li key={student.id} className="p-3 bg-yellow-100 rounded-md shadow-sm">
                <p className="font-semibold text-yellow-800">{student.name}</p>
                <p className="text-sm text-yellow-600">Progress: {student.overallProgress}% - Last Activity: {student.lastActivity}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* All Students Progress Overview */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Class Progress Overview</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Progress</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map(student => (
                <tr key={student.id} className={student.needsAttention ? 'bg-red-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                        <div
                          className={`h-2.5 rounded-full ${student.overallProgress > 70 ? 'bg-green-500' : student.overallProgress > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${student.overallProgress}%`}}
                        ></div>
                      </div>
                      {student.overallProgress}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { TeacherDashboard };
