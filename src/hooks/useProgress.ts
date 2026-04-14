import { useMemo } from 'react';
import { useGameStore } from '../store/useGameStore';

export const useProgress = () => {
  const progress = useGameStore((state) => state.progress);
  const donationProgress = useGameStore((state) => state.donationProgress);

  const currentZone = useMemo(() => {
    if (progress < 0.33) return 1;
    if (progress < 0.66) return 2;
    return 3;
  }, [progress]);

  // Combine player progress and donation progress for visual transformations
  // User donations can "accelerate" the transformation
  const visualImpact = useMemo(() => {
    return Math.min(progress + donationProgress * 0.2, 1);
  }, [progress, donationProgress]);

  const getZoneProgress = (zone: number) => {
    if (zone === 1) return Math.min(progress / 0.33, 1);
    if (zone === 2) return Math.max(0, Math.min((progress - 0.33) / 0.33, 1));
    return Math.max(0, Math.min((progress - 0.66) / 0.34, 1));
  };

  return {
    progress,
    currentZone,
    visualImpact,
    getZoneProgress,
  };
};
