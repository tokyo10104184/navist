// src/app/navist-loop/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import ReviewNotification from '@/features/navist-loop/components/ReviewNotification';
import FlashcardDeck from '@/features/navist-loop/components/FlashcardDeck';
import RetentionScore from '@/features/navist-loop/components/RetentionScore';
import { FlashcardData } from '@/features/navist-loop/components/Flashcard'; // Ensure this path is correct
import { Loader2 } from 'lucide-react'; // For loading spinner
import { Button } from '@/components/ui/button';

// MOCK_NOTIFICATIONS remains client-side as it's UI flavor
const MOCK_NOTIFICATIONS = [
    "Time to review: Key concepts from Algebra!",
    "Flashcard session: Important dates in World History.",
    "Let's solidify your understanding of literary devices.",
    "Quick recall: Chemical symbols and their meanings."
];

export default function NavistLoopPage() {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [retentionScore, setRetentionScore] = useState(0);
  const [notification, setNotification] = useState('');
  const [cardPerformance, setCardPerformance] = useState<Record<string, { remembered: number; forgotten: number }>>({});

  const fetchFlashcards = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/flashcards');
      if (!response.ok) {
        throw new Error(`Failed to fetch flashcards: ${response.statusText}`);
      }
      const data: FlashcardData[] = await response.json();
      // Ensure data is an array before trying to sort or set
      if (Array.isArray(data)) {
        setFlashcards(data.sort(() => Math.random() - 0.5)); // Shuffle them
      } else {
        console.error("Fetched flashcards data is not an array:", data);
        setFlashcards([{id: 'err-format', question: 'Error: Invalid card format from server.', answer:'Please check API.'}]);
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
      setFlashcards([{id: 'err-fetch', question: 'Could not load cards.', answer:'Please try again later.'}]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlashcards();
    setNotification(MOCK_NOTIFICATIONS[Math.floor(Math.random() * MOCK_NOTIFICATIONS.length)]);
  }, [fetchFlashcards]);

  const calculateRetentionScore = useCallback(() => {
    if (flashcards.length === 0 || flashcards[0].id.startsWith('err-')) return 0; // No score if error or no cards

    let totalRemembered = 0;
    let totalAttempts = 0;
    Object.values(cardPerformance).forEach(perf => {
      totalRemembered += perf.remembered;
      totalAttempts += (perf.remembered + perf.forgotten);
    });

    if (totalAttempts === 0) return 0; // No attempts yet, score 0
    return Math.round((totalRemembered / totalAttempts) * 100);
  }, [cardPerformance, flashcards]);

   useEffect(() => {
    const initialPerformance: Record<string, { remembered: number, forgotten: number }> = {};
    if (flashcards.length > 0 && !flashcards[0].id.startsWith('err-')) {
        flashcards.forEach(card => {
            initialPerformance[card.id] = { remembered: 0, forgotten: 0 };
        });
    }
    setCardPerformance(initialPerformance);
  }, [flashcards]);

  useEffect(() => {
    setRetentionScore(calculateRetentionScore());
  }, [cardPerformance, calculateRetentionScore]);

  const handleCardReviewed = (cardId: string, remembered: boolean) => {
    setCardPerformance(prev => {
        const updatedPerf = { ...prev };
        if (!updatedPerf[cardId]) updatedPerf[cardId] = { remembered: 0, forgotten: 0 }; // Should be initialized
        if (remembered) {
            updatedPerf[cardId].remembered += 1;
        } else {
            updatedPerf[cardId].forgotten += 1;
        }
        return updatedPerf;
    });
  };

  const resetDeckAndScore = () => {
    fetchFlashcards(); // Refetches and re-initializes cardPerformance via useEffect
    setNotification(MOCK_NOTIFICATIONS[Math.floor(Math.random() * MOCK_NOTIFICATIONS.length)]);
  };

  if (isLoading) {
    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-xl text-muted-foreground">Loading your flashcards...</p>
        </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-3xl font-bold">Navist Loop - Memory Retention (API)</h1>

      {notification && <ReviewNotification message={notification} />}

      <section aria-labelledby="flashcard-deck-title">
        <div className="flex justify-between items-center mb-4">
            <h2 id="flashcard-deck-title" className="text-2xl font-semibold">Review Flashcards</h2>
        </div>
        {flashcards.length > 0 && !flashcards[0].id.startsWith('err-') ? (
            <FlashcardDeck cards={flashcards} onCardReviewed={handleCardReviewed} onResetDeck={resetDeckAndScore} />
        ) : (
            <div className="text-center p-8 border rounded-md bg-card">
                <p className="text-destructive mb-4">{flashcards[0]?.question || "No flashcards available or error loading."}</p>
                <Button onClick={resetDeckAndScore}>Try Reloading Deck</Button>
            </div>
        )}
      </section>

      <section aria-labelledby="retention-score-title" className="mt-8">
        <h2 id="retention-score-title" className="text-2xl font-semibold mb-4">Your Learning Strength</h2>
        <RetentionScore score={retentionScore} />
      </section>
    </div>
  );
}
