// src/features/navist-loop/components/FlashcardDeck.tsx
'use client';

import { useState, useEffect } from 'react';
import Flashcard, { FlashcardData } from './Flashcard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface FlashcardDeckProps {
  cards: FlashcardData[];
  onCardReviewed: (cardId: string, remembered: boolean) => void;
  onResetDeck?: () => void;
}

export default function FlashcardDeck({ cards, onCardReviewed, onResetDeck }: FlashcardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    setIsCardFlipped(false);
  }, [currentIndex, cards]);

  if (!cards || cards.length === 0) {
    return <p className="text-muted-foreground">このデッキにフラッシュカードはありません。</p>;
  }

  const currentCard = cards[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleCardFlip = (flipped: boolean) => {
    setIsCardFlipped(flipped);
  };

  const handleFeedback = (remembered: boolean) => {
    onCardReviewed(currentCard.id, remembered);
    setTimeout(() => {
        goToNext();
    }, 300);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <p className="text-sm text-muted-foreground">カード {currentIndex + 1} / {cards.length}</p>
      <Flashcard card={currentCard} onFlip={handleCardFlip} />

      {isCardFlipped && (
        <div className="flex space-x-3 mt-4 animate-fadeIn">
            <Button onClick={() => handleFeedback(true)} variant="default" className="bg-green-500 hover:bg-green-600 text-white">
                覚えた！
            </Button>
            <Button onClick={() => handleFeedback(false)} variant="destructive">
                忘れた
            </Button>
        </div>
      )}

      <div className="flex justify-between w-full max-w-md mt-4">
        <Button onClick={goToPrev} variant="outline" size="icon" aria-label="前のカード" disabled={cards.length <= 1}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        {onResetDeck && (
             <Button onClick={onResetDeck} variant="ghost" size="icon" aria-label="デッキをリセット">
                <RotateCcw className="h-5 w-5" />
            </Button>
        )}
        <Button onClick={goToNext} variant="outline" size="icon" aria-label="次のカード" disabled={cards.length <= 1}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      {/* Add fade-in animation for feedback buttons directly in component style for simplicity if not in globals.css */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
