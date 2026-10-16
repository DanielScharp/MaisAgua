import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../store/useGameStore';
import { getTerrainHeight } from '../utils/terrain';

const MOVE_SPEED = 5;
const SPRINT_SPEED = 10;
const JUMP_FORCE = 8;
const GRAVITY = 20;
const WORLD_LENGTH = 200;
const WORLD_WIDTH = 30; // -15 to 15

export type PlayerAnimation = 'Idle' | 'Walk' | 'Run';

export const usePlayerMovement = () => {
  const setPlayerPosition = useGameStore((state) => state.setPlayerPosition);
  const setPlayerAnimation = useGameStore((state) => state.setPlayerAnimation);
  const setPlayerRotation = useGameStore((state) => state.setPlayerRotation);
  
  const playerPosition = useGameStore((state) => state.playerPosition);
  const playerAnimation = useGameStore((state) => state.playerAnimation);
  const playerRotation = useGameStore((state) => state.playerRotation);
  const activeCheckpoint = useGameStore((state) => state.activeCheckpoint);

  const keys = useRef<{ [key: string]: boolean }>({});
  const verticalVelocity = useRef(0);
  const isGrounded = useRef(true);
  const isHit = useRef(false);

  // Temporary vectors for movement calculation to avoid GC
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  const moveVec = new THREE.Vector3();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (activeCheckpoint) return;

    let [x, y, z] = playerPosition;
    
    // 1. Sprinting
    const isSprinting = keys.current['shift'];
    const currentSpeed = isSprinting ? SPRINT_SPEED : MOVE_SPEED;

    // 2. Camera-Relative Movement
    const moveXInput = (keys.current['a'] || keys.current['arrowleft'] ? 1 : 0) + 
                       (keys.current['d'] || keys.current['arrowright'] ? -1 : 0);
    const moveZInput = (keys.current['w'] || keys.current['arrowup'] ? 1 : 0) + 
                       (keys.current['s'] || keys.current['arrowdown'] ? -1 : 0);

    moveVec.set(0, 0, 0);

    if (moveXInput !== 0 || moveZInput !== 0) {
      // Get camera direction
      state.camera.getWorldDirection(forward);
      forward.y = 0; // Keep movement on the horizontal plane
      forward.normalize();

      // Right is perpendicular to forward and up
      right.crossVectors(forward, state.camera.up);
      right.y = 0;
      right.normalize();

      // Corrected Input Mapping for Camera Space:
      const leftInput = (keys.current['a'] || keys.current['arrowleft'] ? 1 : 0);
      const rightInput = (keys.current['d'] || keys.current['arrowright'] ? 1 : 0);
      const upInput = (keys.current['w'] || keys.current['arrowup'] ? 1 : 0);
      const downInput = (keys.current['s'] || keys.current['arrowdown'] ? 1 : 0);

      moveVec
        .addScaledVector(forward, upInput - downInput)
        .addScaledVector(right, rightInput - leftInput)
        .normalize()
        .multiplyScalar(currentSpeed * delta);

      x += moveVec.x;
      z += moveVec.z;

      x = Math.max(-WORLD_WIDTH / 2, Math.min(WORLD_WIDTH / 2, x));
      z = Math.max(0, Math.min(WORLD_LENGTH, z));
    }

    // 3. Jumping & Gravity
    const groundHeight = getTerrainHeight(x, z);
    
    // Check if grounded
    if (y <= groundHeight + 0.1) {
      isGrounded.current = true;
      y = groundHeight;
      verticalVelocity.current = 0;
    } else {
      isGrounded.current = false;
    }

    // Jump trigger
    if (keys.current[' '] && isGrounded.current) {
      verticalVelocity.current = JUMP_FORCE;
      isGrounded.current = false;
    }

    // Apply gravity
    if (!isGrounded.current) {
      verticalVelocity.current -= GRAVITY * delta;
      y += verticalVelocity.current * delta;
      
      // Ground collision check
      if (y < groundHeight) {
        y = groundHeight;
        verticalVelocity.current = 0;
        isGrounded.current = true;
      }
    } else {
      y = groundHeight;
    }

    // Collision check against trees
    const trees = useGameStore.getState().trees;
    let collision = false;
    const PLAYER_RADIUS = 0.5;
    const TRUNK_RADIUS = 0.4;

    for (const tree of trees) {
      const dx = x - tree.x;
      const dz = z - tree.z;
      const distanceSq = dx * dx + dz * dz;
      const minDistance = PLAYER_RADIUS + TRUNK_RADIUS;
      if (distanceSq < minDistance * minDistance) {
        collision = true;
        break;
      }
    }

    if (collision) {
      x = playerPosition[0];
      z = playerPosition[2];
    }

    // 4. Update position in store
    if (x !== playerPosition[0] || y !== playerPosition[1] || z !== playerPosition[2]) {
      setPlayerPosition([x, y, z]);
    }

    // 5. Determine animation and rotation
    const isMoving = moveXInput !== 0 || moveZInput !== 0;
    
    // Default animation
    let animation = isMoving ? (isSprinting ? 'Run' : 'Walk') : 'Idle';
    
    // Override with Hit animation if colliding
    if (collision && !isHit.current) {
      isHit.current = true;
      setPlayerAnimation('Hit');
      
      // Reset hit state after animation plays
      setTimeout(() => {
        isHit.current = false;
      }, 800);
    }
    
    // Only update normal animations if we aren't in the middle of a hit reaction
    if (!isHit.current) {
      if (animation !== playerAnimation) {
        setPlayerAnimation(animation);
      }
    }

    if (isMoving && !isHit.current) {
      const rotation = Math.atan2(moveVec.x, moveVec.z);
      if (rotation !== playerRotation) {
        setPlayerRotation(rotation);
      }
    }
  });

  return { 
    position: playerPosition, 
    animation: playerAnimation, 
    rotation: playerRotation 
  };
};
