import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { ZONES, lerpColors } from '../../utils/colors';
import { getTerrainHeight } from '../../utils/terrain';

const WORLD_LENGTH = 200;
const WORLD_WIDTH = 60;
const RESOLUTION_X = 20;
const RESOLUTION_Z = 100;

export const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  // Create geometry and set static vertex positions/colors
  const { positions, colors } = useMemo(() => {
    const pos = [];
    const col = [];
    
    for (let z = 0; z <= RESOLUTION_Z; z++) {
      for (let x = 0; x <= RESOLUTION_X; x++) {
        const xPos = (x / RESOLUTION_X - 0.5) * WORLD_WIDTH;
        const zPos = (z / RESOLUTION_Z) * WORLD_LENGTH;
        const normalizedZ = zPos / WORLD_LENGTH;
        
        // Procedural height (hills) using utility
        const height = getTerrainHeight(xPos, zPos);
        pos.push(xPos, height, zPos);
        
        // Static color based on spatial gradient
        let targetColor;
        if (normalizedZ < 0.4) {
          targetColor = ZONES[1].terrain;
        } else if (normalizedZ < 0.8) {
          const blend = (normalizedZ - 0.4) / 0.4;
          targetColor = lerpColors(ZONES[1].terrain, ZONES[3].terrain, blend);
        } else {
          targetColor = ZONES[3].terrain;
        }
        
        col.push(targetColor.r, targetColor.g, targetColor.b);
      }
    }
    return { 
      positions: new Float32Array(pos), 
      colors: new Float32Array(col) 
    };
  }, []);

  return (
    <mesh ref={meshRef} receiveShadow>
      <planeGeometry args={[WORLD_WIDTH, WORLD_LENGTH, RESOLUTION_X, RESOLUTION_Z]}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </planeGeometry>
      <meshStandardMaterial vertexColors flatShading roughness={0.8} metalness={0.1} />
    </mesh>
  );
};
