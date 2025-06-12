import React from 'react';

// Removed empty interface AIPersonalitySelectorProps

const AIPersonalitySelector: React.FC = () => { // Changed to React.FC
  return (
    <div className="p-2 border-b mb-4">
      <label htmlFor="personality-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select AI Personality:
      </label>
      <select
        id="personality-select"
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {/* Placeholder options */}
        <option value="default">Default</option>
        <option value="friendly">Friendly Assistant</option>
        <option value="formal">Formal Advisor</option>
        <option value="humorous">Humorous Bot</option>
      </select>
      {/* Alternative: List of buttons */}
      {/*
      <div className="flex space-x-2 mt-2">
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">Default</button>
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">Friendly</button>
        <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">Formal</button>
      </div>
      */}
    </div>
  );
};

export { AIPersonalitySelector }; // Named export for easier import if default is not preferred
// export default AIPersonalitySelector; // Alternative default export
