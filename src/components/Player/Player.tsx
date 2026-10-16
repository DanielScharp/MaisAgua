import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { usePlayerMovement } from '../../hooks/usePlayerMovement';

export const Player = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { position: playerPosition, animation: animationState, rotation: playerRotation } = usePlayerMovement();
  
  // Load the model
  const { scene, animations } = useGLTF('/glb/Farmer.glb');
  const { actions } = useAnimations(animations, meshRef);

  // Handle animation state changes
  useEffect(() => {
    const action = actions[animationState];
    if (action) {
      // Special configuration for one-shot animations
      if (animationState === 'Hit' || animationState === 'Death') {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      } else {
        action.setLoop(THREE.LoopRepeat, Infinity);
      }

      action.reset().fadeIn(0.1).play();
      return () => {
        action.fadeOut(0.1);
      };
    }
  }, [actions, animationState]);

  useFrame(() => {
    if (meshRef.current) {
      // Position internal mesh relative to movement
      meshRef.current.position.set(playerPosition[0], playerPosition[1], playerPosition[2]);
      
      // Smoothly rotate the model to face the direction of movement
      if (animationState !== 'Idle') {
        // Find the shortest path between angles to avoid 360 spins
        let targetRotation = playerRotation;
        let currentRotation = meshRef.current.rotation.y;
        
        // Normalize rotation difference to [-PI, PI]
        let diff = targetRotation - currentRotation;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        
        meshRef.current.rotation.y += diff * 0.2;
      }
    }
  });

  return (
    <group>
      <primitive 
        ref={meshRef} 
        object={scene} 
        scale={0.5} 
        dispose={null}
        castShadow
      />
      
      {/* Simple shadow under player */}
      <mesh 
        position={[playerPosition[0], playerPosition[1] + 0.01, playerPosition[2]]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[0.5, 16]} />
        <meshBasicMaterial color="black" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Pre-load the model
useGLTF.preload('/glb/Farmer.glb');
