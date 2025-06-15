// src/features/planner/components/StudyPlanDisplay.tsx
import { Input } from '@/components/ui/input'; // Added for the checkbox

export interface StudyTask {
  id: string;
  date: string;
  subject: string;
  task: string;
  completed: boolean;
}

interface StudyPlanDisplayProps {
  plan: StudyTask[];
  onToggleComplete?: (taskId: string) => void; // Optional: for future interactivity
}

export default function StudyPlanDisplay({ plan, onToggleComplete }: StudyPlanDisplayProps) {
  if (!plan || plan.length === 0) {
    return <p className="text-muted-foreground">No study plan generated yet. Set a goal to see your plan!</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card">
      <h3 className="text-lg font-semibold mb-3 text-card-foreground">Your Study Plan</h3>
      <div className="space-y-3">
        {plan.map((item) => (
          <div key={item.id} className={`p-3 rounded-md ${item.completed ? 'bg-green-100 dark:bg-green-900/50' : 'bg-muted/50'}`}>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-card-foreground">{item.task}</p>
                    <p className="text-sm text-muted-foreground">{item.subject} - {new Date(item.date).toLocaleDateString()}</p>
                </div>
                {onToggleComplete && (
                     <Input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => onToggleComplete(item.id)}
                        className="h-5 w-5"
                    />
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
