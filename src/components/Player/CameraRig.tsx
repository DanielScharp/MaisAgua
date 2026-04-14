import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '../../store/useGameStore';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export const CameraRig = () => {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useFrame(() => {
    if (controlsRef.current) {
      const [x, y, z] = playerPosition;
      // Focus the camera slightly above the player's center
      controlsRef.current.target.set(x, y + 2, z);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      minDistance={5}
      maxDistance={25}
      minPolarAngle={Math.PI / 6} // Don't look from directly below
      maxPolarAngle={Math.PI / 2.2} // Don't look from directly above
      makeDefault
    />
  );
};
