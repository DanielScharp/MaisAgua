import { useProgress } from '../../hooks/useProgress';

export const Lighting = () => {
  const { progress } = useProgress();

  // Zone 1: Harsh, warm sunlight
  // Zone 3: Soft, golden/greenish warmth
  const lightColor = progress < 0.5 ? '#fff5d6' : '#d6ffda';
  const intensity = progress < 0.5 ? 1.5 : 1.2;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={intensity} 
        color={lightColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.1, 50]} />
      </directionalLight>
      <hemisphereLight intensity={0.3} groundColor="#000000" />
    </>
  );
};
