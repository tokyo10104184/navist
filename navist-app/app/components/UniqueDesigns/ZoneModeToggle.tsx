import React from 'react';

interface ZoneModeToggleProps {
  isZoneModeActive: boolean;
  toggleZoneMode: () => void;
}

const ZoneModeToggle: React.FC<ZoneModeToggleProps> = ({ isZoneModeActive, toggleZoneMode }) => {
  return (
    <button
      onClick={toggleZoneMode}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ease-in-out
                  ${
                    isZoneModeActive
                      ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
      aria-pressed={isZoneModeActive}
      title={isZoneModeActive ? "Deactivate Zone Mode" : "Activate Zone Mode"}
    >
      {isZoneModeActive ? (
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 6z" clipRule="evenodd" />
          </svg>
          Zone Mode Active
        </span>
      ) : (
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-3 0v-1a1.5 1.5 0 011.5-1.5zM5.5 6.5a1.5 1.5 0 011.5-1.5h6a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5v-6zM4 9.5a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5H5.5a1.5 1.5 0 01-1.5-1.5V9.5zM13 8a1.5 1.5 0 00-1.5 1.5v1.5a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5V9.5A1.5 1.5 0 0014.5 8H13z" />
          </svg>
          Activate Zone Mode
        </span>
      )}
    </button>
  );
};

export default ZoneModeToggle;
