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
      meshRef.current.position.y = playerPosition[1] + Math.sin(state.clock.elapsedTime * 6) * 0.05;
      
      meshRef.current.position.x = playerPosition[0];
      meshRef.current.position.z = playerPosition[2];

      // Slight rotation based on movement (optional, but adds life)
      meshRef.current.rotation.y = Math.atan2(
        Math.sin(state.clock.elapsedTime * 0.5), 
        Math.cos(state.clock.elapsedTime * 0.5)
      ) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Body - Leather Vest/Clothing Style */}
      <mesh position={[0, 1, 0]} castShadow>
        <capsuleGeometry args={[0.4, 0.8, 4, 8]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Neck Scarf (Lenço) */}
      <mesh position={[0, 1.5, 0.1]} rotation={[0.2, 0, 0]}>
        <torusGeometry args={[0.25, 0.05, 8, 24]} />
        <meshStandardMaterial color="#bf360c" roughness={0.8} />
      </mesh>
      
      {/* Head - Tanned Skin Tone */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffccbc" roughness={0.5} />
      </mesh>
      
      {/* Hat (Chapéu de Couro) */}
      <group position={[0, 2.05, 0.02]} rotation={[-Math.PI / 12, 0, 0]}>
        {/* Brim - Wide and slightly curved */}
        <mesh castShadow>
          <cylinderGeometry args={[0.65, 0.65, 0.04, 32]} />
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </mesh>
        
        {/* Crown - Dome */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <sphereGeometry args={[0.34, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </mesh>

        {/* Decorative Studs around the crown base */}
        {[...Array(8)].map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 0.34,
              0.03, // Slightly above the brim base for visibility
              Math.sin((i / 8) * Math.PI * 2) * 0.34
            ]}
          >
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>
      
      {/* Eyes */}
      <mesh position={[0.1, 1.85, 0.25]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.1, 1.85, 0.25]} castShadow>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Simple shadow under player */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 16]} />
        <meshBasicMaterial color="black" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};
