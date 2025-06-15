// src/features/buddy-ai/components/ChatLog.tsx
import ChatMessage, { Message } from './ChatMessage';
import React, { useEffect, useRef } from 'react';

interface ChatLogProps {
  messages: Message[];
}

export default function ChatLog({ messages }: ChatLogProps) {
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-grow h-96 overflow-y-auto p-4 border rounded-md mb-4 bg-background">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
