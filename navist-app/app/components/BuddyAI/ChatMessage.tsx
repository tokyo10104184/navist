import React from 'react';

interface ChatMessageProps {
  sender: 'user' | 'ai';
  text: string;
  timestamp?: string; // Optional timestamp
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, timestamp }) => {
  const isUser = sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p className="text-sm">{text}</p>
        {timestamp && (
          <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
};

export { ChatMessage }; // Named export
// export default ChatMessage; // Alternative default export
