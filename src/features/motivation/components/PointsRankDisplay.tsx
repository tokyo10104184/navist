// src/features/motivation/components/PointsRankDisplay.tsx
'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { useUserStore } from "@/store/userStore"; // Import store

export default function PointsRankDisplay() {
  const { points, rank } = useUserStore(); // Get data from store

  return (
    <Card className="text-center shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span>Your Progress</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-3xl font-bold text-primary">{points.toLocaleString()} Points</p>
        <p className="text-lg text-muted-foreground">Rank: {rank}</p>
      </CardContent>
    </Card>
  );
}
