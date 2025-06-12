import React from 'react';
import { AIPersonalitySelector } from './AIPersonalitySelector';
import { ChatMessage } from './ChatMessage';

const BuddyAI = () => {
  return (
    <div className="flex flex-col h-full p-4 border rounded-lg shadow-md bg-gray-50">
      <div className="mb-4">
        <AIPersonalitySelector />
      </div>
      <div className="flex-grow overflow-y-auto mb-4 p-2 border rounded bg-white">
        {/* Placeholder for messages */}
        <ChatMessage sender="user" text="Hello AI!" />
        <ChatMessage sender="ai" text="Hello User! How can I help you today?" />
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default BuddyAI;
