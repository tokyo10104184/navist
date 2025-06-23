// src/app/buddy-ai/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ChatLog from '@/features/buddy-ai/components/ChatLog';
import ChatInput from '@/features/buddy-ai/components/ChatInput';
import AIPersonalitySelector from '@/features/buddy-ai/components/AIPersonalitySelector';
import { Message } from '@/features/buddy-ai/components/ChatMessage';
import { useAIBuddyStore } from '@/store/aiBuddyStore';
import { Button } from '@/components/ui/button';
import Timer from '@/features/buddy-ai/components/Timer'; // Import Timer component

export default function BuddyAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', text: 'こんにちは！今日の勉強で何かお手伝いできることはありますか？まずは今日取り組む学習内容を教えてください。', sender: 'ai' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedPersonality } = useAIBuddyStore();

  const [learningGoal, setLearningGoal] = useState<string | null>(null);
  const [isGoalSet, setIsGoalSet] = useState(false);
  const [awaitingGoalConfirmation, setAwaitingGoalConfirmation] = useState(false);
  const [shouldShowTimerButton, setShouldShowTimerButton] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  useEffect(() => {
    if (messages.length > 0 && messages[0].id === '0' && messages.length === 1) {
      // Skip if only initial message exists
    } else {
      const lastMessageIsPersonalityChange = messages[messages.length - 1]?.text.includes("バディになりますね！");
      const lastMessageIsInitial = messages[messages.length - 1]?.id === '0';
      if (!lastMessageIsPersonalityChange && !lastMessageIsInitial) {
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

  const handleSendMessage = async (text: string) => {
    const newUserMessage: Message = { id: String(Date.now()), text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    let actionType = 'CHAT';
    if (!isGoalSet && !awaitingGoalConfirmation) {
      actionType = 'SET_GOAL';
      setAwaitingGoalConfirmation(true);
    }

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, personality: selectedPersonality, action: actionType }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponseMessage: Message = { id: String(Date.now() + 1), text: data.reply, sender: 'ai' };
      setMessages((prevMessages) => [...prevMessages, aiResponseMessage]);

      if (actionType === 'SET_GOAL') {
        if (data.goalConfirmed) {
          setLearningGoal(text);
          setIsGoalSet(true);
          if (data.showTimerButton) {
            setShouldShowTimerButton(true);
          }
        }
        setAwaitingGoalConfirmation(false);
      }
    } catch (error) {
      console.error("Failed to send message or process AI response:", error);
      const errorMessage: Message = {
        id: String(Date.now() + 1),
        text: 'エラーが発生しました。メッセージの送信に失敗した可能性があります。',
        sender: 'ai',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      if (actionType === 'SET_GOAL') {
        setAwaitingGoalConfirmation(false);
      }
    }
  };

  const handleTriggerTimerScreen = () => {
    setMessages(prev => [...prev, { id: String(Date.now()), text: `タイマーを開始します！目標:「${learningGoal}」頑張ってください！`, sender: 'ai' }]);
    setShouldShowTimerButton(false);
    setIsTimerVisible(true);
  };

  const handleTimerStop = (elapsedTime: number) => {
    setIsTimerVisible(false);
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        text: `学習お疲れ様でした！今回の学習時間は ${Math.floor(elapsedTime / 60)}分${elapsedTime % 60}秒 でした。今日の感想や気づきがあれば教えてくださいね！`,
        sender: 'ai'
      }
    ]);
    setIsGoalSet(false);
    setLearningGoal(null);
  };

  const handleTimerPause = (elapsedTime: number) => {
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        text: `タイマーを一時停止しました。(経過時間: ${Math.floor(elapsedTime / 60)}分${elapsedTime % 60}秒)`,
        sender: 'ai' // Changed from 'system'
      }
    ]);
  };

  const handleTimerResume = (elapsedTime: number) => {
    setMessages(prev => [
      ...prev,
      {
        id: String(Date.now()),
        text: `タイマーを再開しました。(現在の経過時間: ${Math.floor(elapsedTime / 60)}分${elapsedTime % 60}秒)`,
        sender: 'ai' // Changed from 'system'
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">バディAI チャット</h1>
        <AIPersonalitySelector />
      </div>

      {isTimerVisible ? (
        <Timer
          className="my-4"
          onTimerStop={handleTimerStop}
          onTimerPause={handleTimerPause}
          onTimerResume={handleTimerResume}
        />
      ) : (
        <>
          <ChatLog messages={messages} />
          {/* The informational text that was removed in the faulty step is ALREADY GONE here, this is the clean version. */}
          {shouldShowTimerButton && isGoalSet && (
            <div className="my-4 flex justify-center">
              <Button onClick={handleTriggerTimerScreen} size="lg">
                タイマー開始
              </Button>
            </div>
          )}
        </>
      )}

      {!isTimerVisible && (
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading || awaitingGoalConfirmation}
          placeholder={!isGoalSet && !awaitingGoalConfirmation ? "今日の学習内容を入力してください..." : "メッセージを入力..."}
        />
      )}
    </div>
  );
}
