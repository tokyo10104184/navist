import React from 'react';

interface MyLibraryProps {
  stage: 1 | 2 | 3; // Define the possible stages
  userName?: string;
}

const MyLibrary: React.FC<MyLibraryProps> = ({ stage, userName = "Learner" }) => {
  let libraryElements;
  let stageDescription;

  switch (stage) {
    case 1:
      stageDescription = "The Humble Beginnings";
      libraryElements = (
        <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <div className="text-center text-gray-500 mb-4">Stage 1: {stageDescription}</div>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-16 bg-yellow-600 rounded-sm shadow-md text-xs text-white flex items-center justify-center">Simple Desk</div>
            <div className="w-12 h-12 bg-gray-500 rounded-sm shadow text-xs text-white flex items-center justify-center">Chair</div>
            <div className="w-8 h-10 bg-blue-500 rounded-t-sm shadow text-xs text-white flex items-center justify-center transform rotate-3">Book</div>
          </div>
        </div>
      );
      break;
    case 2:
      stageDescription = "Growth and Development";
      libraryElements = (
        <div className="p-6 border-2 border-dashed border-green-300 rounded-lg bg-green-50">
          <div className="text-center text-green-600 mb-6">Stage 2: {stageDescription}</div>
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-end space-x-4">
              <div className="w-16 h-24 bg-lime-700 rounded-sm shadow-lg text-xs text-white flex items-center justify-center">Plant</div>
              <div className="w-40 h-20 bg-yellow-700 rounded-sm shadow-xl text-xs text-white flex items-center justify-center">Wider Desk</div>
              <div className="w-20 h-32 bg-gray-400 rounded-t-lg shadow-md text-xs text-white flex items-center justify-center">Window (Day)</div>
            </div>
            <div className="w-16 h-16 bg-gray-600 rounded-sm shadow-lg text-xs text-white flex items-center justify-center">Nicer Chair</div>
            <div className="w-32 h-24 bg-orange-800 rounded-sm shadow-xl text-xs text-white flex flex-col items-center justify-center p-1">
              Bookshelf
              <div className="flex space-x-1 mt-1">
                <div className="w-3 h-8 bg-red-500"></div>
                <div className="w-3 h-8 bg-blue-500"></div>
                <div className="w-3 h-8 bg-green-500"></div>
                <div className="w-3 h-8 bg-yellow-500"></div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    case 3:
      stageDescription = "A Scholar's Haven";
      libraryElements = (
        <div className="p-8 border-2 border-dashed border-purple-400 rounded-lg bg-purple-50">
          <div className="text-center text-purple-700 mb-8">Stage 3: {stageDescription}</div>
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* Left Side: Bookshelf & Globe */}
            <div className="col-span-1 flex flex-col items-center space-y-4">
              <div className="w-48 h-56 bg-yellow-900 rounded-md shadow-2xl text-xs text-white p-2 flex flex-col justify-around">
                Large Bookshelf
                {[1,2,3,4].map(shelf => (
                  <div key={shelf} className="h-8 bg-black bg-opacity-20 flex items-center justify-start space-x-1 px-1">
                    {[1,2,3,4,5,6].map(book => <div key={book} className={`w-2 h-6 bg-opacity-80 ${['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-indigo-400', 'bg-pink-400'][book-1]}`}></div>)}
                  </div>
                ))}
              </div>
              <div className="w-20 h-20 bg-blue-500 rounded-full shadow-lg text-xs text-white flex items-center justify-center">Globe</div>
            </div>

            {/* Center: Desk & Chair */}
            <div className="col-span-1 flex flex-col items-center">
              <div className="w-56 h-24 bg-stone-700 rounded-lg shadow-xl text-xs text-white flex items-center justify-center">Grand Desk</div>
              <div className="w-24 h-28 bg-red-800 rounded-t-lg shadow-2xl text-xs text-white flex items-center justify-center">Comfy Chair</div>
            </div>

            {/* Right Side: Window & Awards */}
            <div className="col-span-1 flex flex-col items-center space-y-4">
              <div className="w-32 h-40 bg-sky-300 rounded-xl shadow-lg text-xs text-black flex items-center justify-center p-1">Window (Scenic View)</div>
              <div className="flex space-x-2">
                <div className="w-8 h-10 bg-yellow-400 rounded-full shadow text-xs text-black flex items-center justify-center transform -rotate-12">🏆</div>
                <div className="w-8 h-10 bg-gray-300 rounded-full shadow text-xs text-black flex items-center justify-center">🏅</div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
    default:
      stageDescription = "Unknown Stage";
      libraryElements = <p>Invalid library stage.</p>;
  }

  return (
    <div className="p-4 my-4">
      <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">{userName}'s Library</h2>
      {libraryElements}
    </div>
  );
};

export default MyLibrary;
