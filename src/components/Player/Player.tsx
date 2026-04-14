import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePlayerMovement } from '../../hooks/usePlayerMovement';

export const Player = () => {
  const meshRef = useRef<THREE.Group>(null);
  const playerPosition = usePlayerMovement();

  useFrame((state) => {
    if (meshRef.current) {
      // Add terrain height (playerPosition[1]) to the bobbing animation
      meshRef.current.position.y = playerPosition[1] + Math.sin(state.clock.elapsedTime * 10) * 0.1;
      
      meshRef.current.position.x = playerPosition[0];
      meshRef.current.position.z = playerPosition[2];
    }
  });

  return (
    <group ref={meshRef}>
      {/* Body */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.8, 4, 8]} />
        <meshStandardMaterial color="#2196F3" roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FFEB3B" roughness={0.3} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.1, 1.9, 0.2]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.1, 1.9, 0.2]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Simple shadow under player */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 16]} />
        <meshBasicMaterial color="black" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
