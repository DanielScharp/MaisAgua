import { create } from 'zustand';
import type { CheckpointData } from '../components/Checkpoints/CheckpointData';

export interface TreeData {
  x: number;
  z: number;
  y: number;
  scale: number;
  rotation: number;
  leafScale1: number;
  leafScale2: number;
  shrubScale: number;
}

interface GameState {
  // Player state
  playerPosition: [number, number, number];
  progress: number; // 0 to 1
  
  // World state
  trees: TreeData[];
  
  // Donation state
  donationTotal: number;
  donationProgress: number; // 0 to 1, based on goals
  
  // UI state
  activeCheckpoint: CheckpointData | null;
  visitedCheckpoints: Set<string>;
  
  // Actions
  setPlayerPosition: (position: [number, number, number]) => void;
  setTrees: (trees: TreeData[]) => void;
  donate: (amount: number) => void;
  activateCheckpoint: (checkpoint: CheckpointData) => void;
  dismissCheckpoint: () => void;
}

const WORLD_LENGTH = 200;
const DONATION_GOAL = 1000;

export const useGameStore = create<GameState>((set) => ({
  playerPosition: [0, 0, 0],
  progress: 0,
  trees: [],
  donationTotal: 0,
  donationProgress: 0,
  activeCheckpoint: null,
  visitedCheckpoints: new Set(),

  setPlayerPosition: (position) => set(() => {
    // Calculate progress based on Z axis (clamped 0 to 1)
    // Assuming Z goes from 0 to WORLD_LENGTH
    const newProgress = Math.min(Math.max(position[2] / WORLD_LENGTH, 0), 1);
    return { 
      playerPosition: position,
      progress: newProgress 
    };
  }),

  setTrees: (trees) => set({ trees }),

  donate: (amount) => set((state) => {
    const newTotal = state.donationTotal + amount;
    const newDonationProgress = Math.min(newTotal / DONATION_GOAL, 1);
    return {
      donationTotal: newTotal,
      donationProgress: newDonationProgress
    };
  }),

  activateCheckpoint: (checkpoint) => set((state) => {
    const newVisited = new Set(state.visitedCheckpoints);
    newVisited.add(checkpoint.id);
    return {
      activeCheckpoint: checkpoint,
      visitedCheckpoints: newVisited
    };
  }),

  dismissCheckpoint: () => set({ activeCheckpoint: null }),
}));
