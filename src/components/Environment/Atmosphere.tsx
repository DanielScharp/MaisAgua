import { Sky } from '@react-three/drei';
import { useProgress } from '../../hooks/useProgress';

export const Atmosphere = () => {
  const { progress } = useProgress();

  // Zone 1: Hazy, washed-out sky (turbidity 10, rayleigh 3)
  // Zone 3: Vibrant blue sky (turbidity 2, rayleigh 1)
  const turbidity = 10 - (progress * 8);
  const rayleigh = 3 - (progress * 2);
  const inclination = 0.5 + (progress * 0.1); // subtle sun height change

  return (
    <>
      <Sky 
        turbidity={turbidity} 
        rayleigh={rayleigh} 
        inclination={inclination} 
        distance={450000} 
        sunPosition={[10, 20, 10]} 
      />
      <fog attach="fog" args={['#e0d0b0', 10, 50 + (progress * 50)]} />
    </>
  );
};
