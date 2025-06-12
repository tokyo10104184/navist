"use client";

import React, { useState, useEffect } from 'react';

interface AICoachingMessagesProps {
  messages?: string[]; // Allow passing a list of messages
  interval?: number; // Time in ms to cycle messages
}

const defaultMessages = [
  "Great job on that last session! Keep it up!",
  "You're making fantastic progress. Every step forward counts!",
  "Remember why you started. You've got this!",
  "Don't be afraid to tackle challenging topics. That's where growth happens!",
  "Consistency is key. Keep building those learning habits!",
  "Believe in yourself! You're capable of amazing things.",
];

const AICoachingMessages: React.FC<AICoachingMessagesProps> = ({
  messages = defaultMessages,
  interval = 10000, // Default to 10 seconds
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (messages.length > 1) {
      const timer = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, interval);
      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [messages, interval]);

  if (!messages || messages.length === 0) {
    return null; // Don't render if no messages
  }

  return (
    <div className="p-4 bg-teal-100 border-l-4 border-teal-500 text-teal-700 rounded-md shadow-sm">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5a1 1 0 0 1-1-1V9a1 1 0 0 1 2 0v5a1 1 0 0 1-1 1zm1-8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
        </div>
        <div>
          <p className="font-semibold">AI Coach</p>
          <p className="text-sm">{messages[currentMessageIndex]}</p>
        </div>
      </div>
    </div>
  );
};

export { AICoachingMessages };
