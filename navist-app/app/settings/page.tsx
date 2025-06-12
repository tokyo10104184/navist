"use client"; // Required for useZoneMode and toggle interaction

import React from 'react';
import { AIPersonalitySelector } from '@/app/components/BuddyAI';
import { ZoneModeToggle } from '@/app/components/UniqueDesigns';
import { useZoneMode } from '@/app/contexts'; // Correct path assumed

const SettingsPage = () => {
  const { isZoneModeActive, toggleZoneMode } = useZoneMode();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Settings</h1>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">AI Settings</h2>
          <AIPersonalitySelector />
          {/* More AI settings could go here */}
        </section>

        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Focus & Productivity</h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg text-gray-600">Zone Mode</h3>
              <p className="text-sm text-gray-500">
                {isZoneModeActive
                  ? "Currently active. All non-essential UI elements are hidden."
                  : "Activate to minimize distractions and focus on learning tasks."}
              </p>
            </div>
            <ZoneModeToggle
              isZoneModeActive={isZoneModeActive}
              toggleZoneMode={toggleZoneMode}
            />
          </div>
        </section>

        {/* Example of a setting that might be hidden by ZoneMode itself */}
        {!isZoneModeActive && (
           <section className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Notification Preferences</h2>
            <p className="text-sm text-gray-500">Configure your notification settings here (placeholder).</p>
            {/* Placeholder for notification settings */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="emailNotifications" className="text-gray-600">Email Notifications</label>
                <input type="checkbox" id="emailNotifications" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked/>
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="pushNotifications" className="text-gray-600">Push Notifications</label>
                <input type="checkbox" id="pushNotifications" className="form-checkbox h-5 w-5 text-blue-600" />
              </div>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default SettingsPage;
