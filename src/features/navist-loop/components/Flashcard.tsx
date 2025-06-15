// src/features/navist-loop/components/Flashcard.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardProps {
  card: FlashcardData;
  onFlip?: (isFlipped: boolean) => void;
}

export default function Flashcard({ card, onFlip }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    if (onFlip) {
      onFlip(newFlippedState);
    }
  };

  if (!card) {
    return (
      <Card className="w-full max-w-md h-72 flex flex-col justify-center items-center p-6 shadow-lg">
        <CardContent><p>No card to display.</p></CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md h-72 perspective group">
      <div className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of the card */}
        <Card className="absolute w-full h-full backface-hidden flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-center text-muted-foreground text-sm">Question</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center text-center text-xl font-semibold p-4 overflow-y-auto">
            <p>{card.question}</p>
          </CardContent>
          <CardFooter className="flex-shrink-0 flex justify-center p-4">
            <Button onClick={handleFlip} variant="outline">Show Answer</Button>
          </CardFooter>
        </Card>
        {/* Back of the card */}
        <Card className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="text-center text-muted-foreground text-sm">Answer</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center text-center text-lg p-4 overflow-y-auto">
            <p>{card.answer}</p>
          </CardContent>
          <CardFooter className="flex-shrink-0 flex justify-center p-4">
            <Button onClick={handleFlip} variant="outline">Show Question</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
