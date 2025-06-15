// src/store/userStore.ts
import { create } from 'zustand';

export interface UserState {
  name: string;
  avatarImage?: string; // Optional image URL
  points: number;
  rank: string;
  setName: (name: string) => void;
  setAvatarImage: (imageUrl: string) => void;
  addPoints: (amount: number) => void;
  setRank: (rank: string) => void;
  // Simulate earning points and changing rank
  simulateProgress: () => void;
}

const MOCK_RANKS = [
    "Curious Beginner", "Eager Explorer", "Dedicated Learner",
    "Skilled Achiever", "Knowledge Navigator", "Master Scholar"
];

export const useUserStore = create<UserState>((set, get) => ({
  name: "Alex L.", // Initial mock data
  points: 1250,
  rank: "Dedicated Learner",
  setName: (name) => set({ name }),
  setAvatarImage: (imageUrl) => set({ avatarImage: imageUrl }),
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  setRank: (rank) => set({ rank }),
  simulateProgress: () => {
    const pointsEarned = Math.floor(Math.random() * 100) + 50;
    const newPoints = get().points + pointsEarned;
    let newRank = get().rank;

    // Simplified rank progression based on points
    // Iterate backwards through MOCK_RANKS (ordered by prestige)
    const rankThresholds: { [key: string]: number } = {
        [MOCK_RANKS[0]]: 0,
        [MOCK_RANKS[1]]: 500,
        [MOCK_RANKS[2]]: 1000,
        [MOCK_RANKS[3]]: 1500, // Adjusted threshold for demo
        [MOCK_RANKS[4]]: 2000, // Adjusted threshold for demo
        [MOCK_RANKS[5]]: 2500  // Adjusted threshold for demo
    };

    for (let i = MOCK_RANKS.length - 1; i >= 0; i--) {
        const rankName = MOCK_RANKS[i];
        if (newPoints >= rankThresholds[rankName]) {
            newRank = rankName;
            break;
        }
    }

    set({ points: newPoints, rank: newRank });
    // Could return pointsEarned for UI feedback if needed
  }
}));
