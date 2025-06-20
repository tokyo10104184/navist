// src/app/motivation/page.tsx
'use client';

import { useState, useEffect } from 'react'; // Keep for local state like feedback messages
import PointsRankDisplay from '@/features/motivation/components/PointsRankDisplay';
import AvatarDisplay from '@/features/motivation/components/AvatarDisplay';
import PositiveFeedback from '@/features/motivation/components/PositiveFeedback';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import { useUserStore } from '@/store/userStore'; // Import store

const MOCK_POSITIVE_FEEDBACKS = [
  "素晴らしい調子です、その調子で頑張って！",
  "すごい努力ですね！一歩一歩が大切です。",
  "継続は力なり、完璧です！",
  "わあ、たくさんのことを学びましたね！",
  "あなたの熱意は素晴らしいです！",
  "限界を押し広げ続けましょう、あなたはスターです！",
];

export default function MotivationPage() {
  // User data (name, points, rank) now comes from Zustand store
  // The simulateProgress action is also from the store.
  const { name, points, rank, simulateProgress: simulateProgressInStore } = useUserStore();

  const [feedback, setFeedback] = useState(
    MOCK_POSITIVE_FEEDBACKS[Math.floor(Math.random() * MOCK_POSITIVE_FEEDBACKS.length)]
  );

  const getNewFeedback = () => {
    let newFeedback = feedback;
    if (MOCK_POSITIVE_FEEDBACKS.length > 1) {
        while (newFeedback === feedback) {
            newFeedback = MOCK_POSITIVE_FEEDBACKS[Math.floor(Math.random() * MOCK_POSITIVE_FEEDBACKS.length)];
        }
    }
    setFeedback(newFeedback);
  };

  const handleSimulateProgress = () => {
    // const currentPoints = points; // This variable was unused.
    simulateProgressInStore(); // Call the action from the store

    // The store now handles points and rank updates.
    // We can set feedback based on the action.
    // To make feedback more specific (e.g., "You earned X points!"),
    // the store's simulateProgress action would need to return the pointsEarned.
    // For now, let's create a generic message and then update it if points changed.
    // This requires reading the 'points' again from the store *after* the action.
    // However, Zustand updates may not be synchronous in a way that 'points' variable here updates immediately.
    // A robust way is to subscribe to store changes or have actions return values.
    // For this example, we'll keep it simple:
    setFeedback(`Awesome! You completed a task! Check your updated points and rank.`);
  };

  // This useEffect will show the updated points in the feedback if they change.
  // This is a reactive way to show the result of the store action.
  useEffect(() => {
    // This is just an example of reacting to points change for feedback.
    // Could be more sophisticated.
    if (feedback.startsWith("素晴らしい！") || feedback.startsWith("Awesome!")) { // Check if it was the simulate progress feedback, accommodate old text if needed during transition
        setFeedback(`進捗をシミュレートしました！現在 ${points} ポイント、ランクは ${rank} です。この調子で頑張りましょう！`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, rank]); // React to changes in points and rank from the store

  return (
    <div className="space-y-8 text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">モチベーションハブ (Zustand連携)</h1>

      {/* AvatarDisplay and PointsRankDisplay now use the store directly, no props needed */}
      <section aria-labelledby="avatar-section-title">
        <h2 id="avatar-section-title" className="sr-only">Your Avatar ({name})</h2>
        <AvatarDisplay />
      </section>

      <section aria-labelledby="points-rank-title">
        <h2 id="points-rank-title" className="sr-only">Points and Rank</h2>
        <PointsRankDisplay />
      </section>

      <section aria-labelledby="positive-feedback-title">
        <PositiveFeedback message={feedback} />
        <Button onClick={getNewFeedback} variant="outline" className="mt-4">
          Get Another Encouragement
        </Button>
      </section>

      <section aria-labelledby="simulate-progress-title" className="pt-4">
        <h2 id="simulate-progress-title" className="text-xl font-semibold mb-2">Learning Action</h2>
         <Button onClick={handleSimulateProgress} size="lg">
            <Gift className="mr-2 h-5 w-5" /> Complete a Learning Task!
        </Button>
        <p className="text-sm text-muted-foreground mt-2">(Click to simulate earning points and progress via Zustand)</p>
      </section>
    </div>
  );
}
