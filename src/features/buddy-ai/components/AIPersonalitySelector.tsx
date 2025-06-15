// src/features/buddy-ai/components/AIPersonalitySelector.tsx
'use client'; // Keep if it uses client-side logic, or remove if only using store

import { Button } from '@/components/ui/button';
import { useAIBuddyStore } from '@/store/aiBuddyStore';

export default function AIPersonalitySelector() {
  const { selectedPersonality, personalities, setSelectedPersonality } = useAIBuddyStore();

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-2">Choose AI Buddy's Personality:</p>
      <div className="flex space-x-2 flex-wrap gap-2"> {/* Added flex-wrap and gap for better layout */}
        {personalities.map((p) => (
          <Button
            key={p}
            variant={selectedPersonality === p ? 'default' : 'outline'}
            onClick={() => setSelectedPersonality(p)}
            size="sm" // Smaller buttons might fit better
          >
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
}
