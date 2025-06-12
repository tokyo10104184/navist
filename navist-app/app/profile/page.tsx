import React from 'react';
import { MotivationEngine } from '@/app/components/MotivationEngine';
import { DreamNoteVisualization } from '@/app/components/UniqueSystems';
import { ShareableInfographic } from '@/app/components/UniqueDesigns'; // Added this as it fits profile
import { useZoneMode } from '@/app/contexts';


const ProfilePage = () => {
  const { isZoneModeActive } = useZoneMode();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>

      {!isZoneModeActive && ( // Hide most profile elements in Zone Mode
        <>
          <section className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Motivation & Achievements</h2>
            <MotivationEngine />
          </section>

          <section className="mb-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dream Board</h2>
            <DreamNoteVisualization dreamTarget="achieve my learning goals" />
          </section>

          <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">My Learning Summary</h2>
            <ShareableInfographic />
          </section>
        </>
      )}

      {isZoneModeActive && (
         <div className="mb-6 p-4 bg-indigo-100 border border-indigo-300 rounded-lg text-indigo-700">
          <p className="font-semibold">Zone Mode is ACTIVE.</p>
          <p>Profile elements are hidden to maintain focus. Exit Zone Mode to view your profile.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
