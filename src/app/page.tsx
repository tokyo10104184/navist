// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation'; // Using next/navigation for App Router
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();

  const handleStartLearning = () => {
    router.push('/buddy-ai');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]"> {/* Adjust height to fill viewport minus header/footer approx */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Navistへようこそ！</h1>
        <p className="text-lg text-muted-foreground mb-10">
          AIバディと一緒に、今日の学習目標を達成しましょう。
        </p>
        <Button
          size="lg" // Make button larger
          className="px-8 py-6 text-xl" // Custom padding and text size
          onClick={handleStartLearning}
        >
          学習を開始
        </Button>
      </div>
    </div>
  );
}
