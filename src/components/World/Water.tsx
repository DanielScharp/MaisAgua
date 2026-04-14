import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Water = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material instanceof THREE.MeshStandardMaterial) {
      // Gentle wave animation
      meshRef.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, 0.1, 140]} // Positioned in the fertile zone (starts around 80, ends at 200)
    >
      <planeGeometry args={[10, 120, 1, 12]} />
      <meshStandardMaterial 
        color="#2196F3" 
        transparent 
        opacity={0.6} 
        roughness={0.1} 
        metalness={0.8}
      />
    </mesh>
  );
};
