import Link from 'next/link';
import React from 'react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8"> {/* Adjust min-h if header/footer height changes */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-md">
        Welcome to Navist!
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        Your personal AI-powered companion to navigate your learning journey, stay motivated, and achieve your educational goals.
      </p>
      <Link
        href="/dashboard"
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg text-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Go to Dashboard
      </Link>
      <div className="mt-16 text-sm text-gray-500">
        <p>Explore features like the AI Study Buddy, Personal Learning Planner, and more!</p>
      </div>
    </div>
  );
}
