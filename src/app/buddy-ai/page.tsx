// src/app/buddy-ai/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ChatLog from '@/features/buddy-ai/components/ChatLog';
import ChatInput from '@/features/buddy-ai/components/ChatInput';
import AIPersonalitySelector from '@/features/buddy-ai/components/AIPersonalitySelector';
import { Message } from '@/features/buddy-ai/components/ChatMessage';
import { useAIBuddyStore } from '@/store/aiBuddyStore'; // Import store

export default function BuddyAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: 'こんにちは！今日の勉強で何かお手伝いできることはありますか？', sender: 'ai' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Get personality from Zustand store
  const { selectedPersonality } = useAIBuddyStore(); // Only need selectedPersonality here

  // Optional: Effect to send a message when personality changes in the store
  // This demonstrates reacting to store changes initiated by the selector
  useEffect(() => {
    // Check if it's not the initial personality to avoid sending message on page load
    // This requires knowing the initial personality or a more complex check
    // For simplicity, let's assume any change after initial load triggers this.
    // A more robust way would be to compare previous vs current personality if needed.
    if (messages.length > 1 || (messages.length === 1 && messages[0].id !== '0')) { // Avoid on initial load/message
        const lastMessageIsPersonalityChange = messages[messages.length-1]?.text.includes("バディになりますね！"); // Updated check string
        if (!lastMessageIsPersonalityChange) { // Avoid sending duplicate messages if already sent
            const newMessage: Message = {
                id: String(Date.now()),
                text: `わかりました、これからは ${selectedPersonality} バディになりますね！ (設定変更)`,
                sender: 'ai'
            };
            setMessages(prev => [...prev, newMessage]);
        }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPersonality]);


  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = { id: String(Date.now()), text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    setTimeout(() => {
      // Use selectedPersonality from store for the AI response
      const aiResponseText = `(${selectedPersonality} AI): 「${text}」ですね。これはダミーレスポンスです...`;
      const newAiMessage: Message = { id: String(Date.now() + 1), text: aiResponseText, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  // handleSelectPersonality is no longer needed here as selector updates store directly.
  // The useEffect above handles reacting to personality changes from the store.

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]"> {/* Adjust height as needed */}
      <h1 className="text-2xl font-bold mb-4">バディAI チャット (Zustand連携)</h1>
      <AIPersonalitySelector /> {/* No props needed now */}
      <ChatLog messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
