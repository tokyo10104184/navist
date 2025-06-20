// src/features/planner/components/GoalSetter.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // For longer goal descriptions
// Note: shadcn/ui DatePicker can be complex. For MVP, a simple text input for date is fine.
// If DatePicker is added, need: npx shadcn-ui@latest add date-picker popover calendar

export interface Goal {
  description: string;
  targetDate: string;
}

interface GoalSetterProps {
  onSetGoal: (goal: Goal) => void;
  currentGoal?: Goal;
}

export default function GoalSetter({ onSetGoal, currentGoal }: GoalSetterProps) {
  const [description, setDescription] = useState(currentGoal?.description || '');
  const [targetDate, setTargetDate] = useState(currentGoal?.targetDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && targetDate.trim()) {
      onSetGoal({ description, targetDate });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-sm bg-card">
      <div>
        <label htmlFor="goalDescription" className="block text-sm font-medium text-card-foreground mb-1">
          学習目標
        </label>
        <Textarea
          id="goalDescription"
          placeholder="例：代数の第5章をマスターする"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-background"
        />
      </div>
      <div>
        <label htmlFor="targetDate" className="block text-sm font-medium text-card-foreground mb-1">
          目標日
        </label>
        <Input
          id="targetDate"
          type="date" // HTML5 date picker
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          required
          className="bg-background"
        />
      </div>
      <Button type="submit" className="w-full">
        {currentGoal ? '目標を更新' : '目標を設定'}
      </Button>
    </form>
  );
}
