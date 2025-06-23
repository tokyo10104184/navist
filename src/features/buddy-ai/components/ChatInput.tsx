// src/features/buddy-ai/components/ChatInput.tsx
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; // Will need 'use client' on page

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSendMessage, isLoading, placeholder = "メッセージを入力..." }: ChatInputProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="text"
        placeholder={placeholder} // Use the prop here
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
        className="flex-grow"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? '送信中...' : '送信'}
      </Button>
    </form>
  );
}
