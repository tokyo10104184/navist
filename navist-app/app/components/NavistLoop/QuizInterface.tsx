"use client";

import React, { useState } from 'react';

interface QuizInterfaceProps {
  // Props can be added, e.g., quiz data, onAnswer callback
}

const QuizInterface: React.FC<QuizInterfaceProps> = () => {
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [fillBlankAnswer, setFillBlankAnswer] = useState('');

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Quiz Time!</h2>

      {/* Flashcard Example */}
      <div className="mb-6 p-4 border rounded-md bg-blue-50">
        <h3 className="text-lg font-medium text-blue-700 mb-2">Flashcard</h3>
        <div className="relative w-full h-32 perspective">
          <div
            className={`absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
              showFlashcardAnswer ? 'rotate-y-180' : ''
            }`}
            onClick={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
          >
            {/* Front of the card */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 bg-blue-400 text-white rounded-lg shadow cursor-pointer">
              <p className="text-center">What is the powerhouse of the cell?</p>
            </div>
            {/* Back of the card */}
            <div className="absolute w-full h-full rotate-y-180 backface-hidden flex items-center justify-center p-4 bg-blue-600 text-white rounded-lg shadow cursor-pointer">
              <p className="text-center">Mitochondria</p>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Click card to flip</p>
      </div>

      {/* Fill-in-the-blank Example */}
      <div className="p-4 border rounded-md bg-green-50">
        <h3 className="text-lg font-medium text-green-700 mb-2">Fill in the Blank</h3>
        <p className="mb-2 text-gray-600">
          The capital of France is ______.
        </p>
        <input
          type="text"
          value={fillBlankAnswer}
          onChange={(e) => setFillBlankAnswer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Your answer"
        />
        <button
          className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Check Answer
        </button>
      </div>
    </div>
  );
};

export { QuizInterface };
