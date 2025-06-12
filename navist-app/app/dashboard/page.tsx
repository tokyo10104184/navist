import React from 'react';
import { MyLibrary } from '@/app/components/UniqueDesigns';
import { PersonalAIPlanner } from '@/app/components/PersonalAIPlanner';
// import { ShareableInfographic } from '@/app/components/UniqueDesigns'; // Example for later

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Library</h2>
          {/* Example: Cycle through library stages or set based on user progress */}
          <MyLibrary stage={2} userName="Your" />
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">AI Learning Planner</h2>
          <PersonalAIPlanner />
        </section>
      </div>

      {/*
      <section className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Weekly Summary</h2>
        <ShareableInfographic userName="Your" />
      </section>
      */}
    </div>
  );
};

export default DashboardPage;
