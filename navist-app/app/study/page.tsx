import React from 'react';
import { BuddyAI } from '@/app/components/BuddyAI';
import { NavistLoop } from '@/app/components/NavistLoop';
import { SilentStudyHall } from '@/app/components/UniqueSystems';
import { useZoneMode } from '@/app/contexts';

const StudyPage = () => {
  const { isZoneModeActive } = useZoneMode();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Study Zone</h1>

      {isZoneModeActive && (
        <div className="mb-6 p-4 bg-indigo-100 border border-indigo-300 rounded-lg text-indigo-700">
          <p className="font-semibold">Zone Mode is ACTIVE.</p>
          <p>Distractions are minimized. Focus on your learning!</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">AI Study Buddy</h2>
          <BuddyAI />
        </section>

        {!isZoneModeActive && ( // Hide NavistLoop and SilentStudyHall if Zone Mode is active to simplify
          <>
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Navist Loop - Review & Quiz</h2>
              <NavistLoop />
            </section>

            <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Silent Study Hall</h2>
              <SilentStudyHall />
            </section>
          </>
        )}
         {isZoneModeActive && (
           <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
             <h2 className="text-2xl font-semibold mb-4 text-gray-700">Silent Study Hall</h2>
             <p className="mb-4 text-sm text-gray-600">Focus on your current task. The Study Hall is active in Zone Mode.</p>
             <SilentStudyHall />
           </section>
         )}
      </div>
    </div>
  );
};

export default StudyPage;
