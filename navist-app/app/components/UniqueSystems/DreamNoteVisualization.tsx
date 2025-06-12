import React from 'react';

interface DreamNoteVisualizationProps {
  imageUrl?: string; // URL for the dream image
  motivationalQuote?: string;
  userNote?: string;
  aiMessage?: string;
  dreamTarget?: string; // e.g., "Stanford University", "Software Engineer at Google"
}

const DreamNoteVisualization: React.FC<DreamNoteVisualizationProps> = ({
  imageUrl, // Allow dynamic image URL
  motivationalQuote = "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  userNote = "My goal is to graduate with honors and contribute to open-source AI projects.",
  dreamTarget = "a top-tier research university",
  aiMessage, // Allow dynamic AI message
}) => {
  const finalAiMessage = aiMessage || `Keep focusing on your goal of ${dreamTarget}! Every small step brings you closer.`;

  return (
    <div className="p-6 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-xl text-white min-h-[400px] flex flex-col justify-between">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-bold drop-shadow-md">My Dream Note</h1>
      </header>

      <div className="flex-grow flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Image Section */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col items-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Dream Visualization"
              className="w-full h-48 object-cover rounded-lg shadow-lg border-2 border-white"
            />
          ) : (
            <div className="w-full h-48 bg-black bg-opacity-20 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="text-gray-200">Placeholder Image (e.g., University Campus)</span>
            </div>
          )}
          <button
            type="button"
            className="mt-3 px-4 py-2 bg-white text-pink-600 font-semibold rounded-md shadow hover:bg-gray-100 transition duration-150"
            onClick={() => alert("Image upload functionality not implemented yet.")} // Placeholder action
          >
            Upload Image
          </button>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-4">
          {motivationalQuote && (
            <div className="p-3 bg-black bg-opacity-20 rounded-md">
              <p className="text-sm italic">&quot;{motivationalQuote}&quot;</p>
            </div>
          )}
          {userNote && (
            <div className="p-3 bg-black bg-opacity-20 rounded-md">
              <h3 className="font-semibold mb-1">My Note:</h3>
              <p className="text-sm whitespace-pre-wrap">{userNote}</p>
            </div>
          )}
        </div>
      </div>

      {/* AI Generated Message */}
      <footer className="mt-6 p-3 bg-black bg-opacity-30 rounded-md text-center">
        <p className="text-sm font-medium animate-pulse">✨ {finalAiMessage} ✨</p>
      </footer>
    </div>
  );
};

export default DreamNoteVisualization;
