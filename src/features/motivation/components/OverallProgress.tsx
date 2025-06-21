// src/features/motivation/components/OverallProgress.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CalendarDays } from "lucide-react"; // Added CalendarDays

interface OverallProgressProps {
  goalDescription?: string; // Made optional as goal might not be set
  progressPercent: number; // 0-100
  daysLeft?: number;
  tasksCompleted: number;
  totalTasks: number;
}

export default function OverallProgress({
  goalDescription,
  progressPercent,
  daysLeft,
  tasksCompleted,
  totalTasks
}: OverallProgressProps) {
  return (
    <Card className="flex-1"> {/* Added flex-1 for responsive layouts */}
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl"> {/* Increased size */}
            <Target className="mr-2 h-6 w-6 text-primary" />
            総合進捗
            </CardTitle>
            {daysLeft !== undefined && (
                <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 h-4 w-4" />
                    残り {daysLeft}日
                </div>
            )}
        </div>
        {goalDescription && <CardDescription className="mt-1">目標: {goalDescription}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <Progress value={progressPercent} className="w-full h-3" /> {/* Made progress bar thicker */}
        <div className="text-sm text-muted-foreground">
          達成率: <span className="font-semibold text-foreground">{progressPercent}%</span>
          <span className="mx-2">|</span>
          タスク: <span className="font-semibold text-foreground">{tasksCompleted} / {totalTasks}</span>
        </div>
      </CardContent>
    </Card>
  );
}
