// src/features/navist-loop/components/RetentionScore.tsx
import { Progress } from "@/components/ui/progress";

interface RetentionScoreProps {
  score: number; // 0-100
}

export default function RetentionScore({ score }: RetentionScoreProps) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card text-center">
      <h3 className="text-lg font-semibold mb-2 text-card-foreground">Current Retention Score</h3>
      <p className="text-3xl font-bold mb-3 text-primary">{normalizedScore}%</p>
      <Progress value={normalizedScore} className="w-full [&>div]:bg-primary" />
    </div>
  );
}
