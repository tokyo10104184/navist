// src/store/aiBuddyStore.ts
import { create } from 'zustand';

// export const AI_PERSONALITIES = ['Friendly', 'Logical', 'Energetic', 'Calm', 'Socratic'];
export const AI_PERSONALITIES = ['フレンドリー', '論理的', '元気いっぱい', '穏やか', 'ソクラテス風'];


interface AIBuddyState {
  selectedPersonality: string;
  personalities: string[];
  setSelectedPersonality: (personality: string) => void;
}

export const useAIBuddyStore = create<AIBuddyState>((set) => ({
  selectedPersonality: AI_PERSONALITIES[0],
  personalities: AI_PERSONALITIES,
  setSelectedPersonality: (personality) => set({ selectedPersonality: personality }),
}));
