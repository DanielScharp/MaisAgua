import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../../store/useGameStore';
import type { CheckpointData } from './CheckpointData';

interface CheckpointProps {
  data: CheckpointData;
}

export const Checkpoint = ({ data }: CheckpointProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const playerPosition = useGameStore((state) => state.playerPosition);
  const activateCheckpoint = useGameStore((state) => state.activateCheckpoint);
  const visitedCheckpoints = useGameStore((state) => state.visitedCheckpoints);
  
  const isVisited = visitedCheckpoints.has(data.id);

  useFrame(() => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.02;
    }

    // Collision detection (radius = 3)
    const dist = Math.sqrt(
      Math.pow(playerPosition[0] - 0, 2) + 
      Math.pow(playerPosition[2] - data.z, 2)
    );

    if (dist < 3 && !isVisited) {
      activateCheckpoint(data);
    }
  });

  return (
    <group position={[0, 0, data.z]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={meshRef}>
          {/* Outer ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.05, 16, 32]} />
            <meshStandardMaterial 
              color={isVisited ? "#888" : "#2196F3"} 
              emissive={isVisited ? "#444" : "#2196F3"} 
              emissiveIntensity={2} 
            />
          </mesh>
          
          {/* Inner crystal */}
          <mesh position={[0, 0, 0]}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial 
              color={isVisited ? "#aaa" : "#64B5F6"} 
              emissive={isVisited ? "#555" : "#64B5F6"} 
              emissiveIntensity={1} 
            />
          </mesh>
        </group>
      </Float>

      {/* Floating text above */}
      <Text
        position={[0, 3, 0]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.8}
        color={isVisited ? "#888" : "white"}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        {data.title}
      </Text>

      {/* Ground indicator */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.6, 32]} />
        <meshBasicMaterial color={isVisited ? "#444" : "#2196F3"} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};
