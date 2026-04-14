import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameStore, type TreeData } from '../../store/useGameStore';
import { getTerrainHeight } from '../../utils/terrain';

const WORLD_LENGTH = 200;
const WORLD_WIDTH = 60;
const TREE_COUNT = 300;

export const Vegetation = () => {
  const trees = useGameStore((state) => state.trees);
  const setTrees = useGameStore((state) => state.setTrees);
  
  // Refs for instanced meshes
  const trunkRef = useRef<THREE.InstancedMesh>(null);
  const leavesLowerRef = useRef<THREE.InstancedMesh>(null);
  const leavesUpperRef = useRef<THREE.InstancedMesh>(null);
  const shrubRef = useRef<THREE.InstancedMesh>(null);

  // Initialize trees in store if empty
  useEffect(() => {
    if (trees.length === 0) {
      const data = [];
      for (let i = 0; i < TREE_COUNT; i++) {
        const z = Math.random() * WORLD_LENGTH;
        const x = (Math.random() - 0.5) * WORLD_WIDTH;
        if (Math.abs(x) < 5) continue;
        
        const scale = 0.5 + Math.random() * 1.5;
        const rotation = Math.random() * Math.PI * 2;
        const groundHeight = getTerrainHeight(x, z);

        // Static Growth Logic
        const normalizedZ = z / WORLD_LENGTH;
        let leafScale1 = 0;
        let leafScale2 = 0;
        let shrubScale = 0;

        // Transition starts at 35% of the map
        if (normalizedZ > 0.35) {
          const isLush = normalizedZ > 0.66;
          const growthFactor = Math.min((normalizedZ - 0.35) * 3, 1);
          
          leafScale1 = isLush ? scale * 1.5 : scale * 0.9 * growthFactor;
          leafScale2 = isLush ? scale * 1.2 : 0;
          
          if (!isLush) {
            shrubScale = scale * 0.8 * growthFactor;
          }
        }
        
        data.push({ x, z, y: groundHeight, scale, rotation, leafScale1, leafScale2, shrubScale });
      }
      setTrees(data);
    }
  }, [trees.length, setTrees]);

  useFrame((state) => {
    if (!trunkRef.current || !leavesLowerRef.current || !leavesUpperRef.current || !shrubRef.current || trees.length === 0) return;

    const dummy = new THREE.Object3D();
    const time = state.clock.elapsedTime;
    let treeIdx = 0;

    trees.forEach((tree: TreeData) => {
      // 1. Position Trunk (always visible)
      dummy.position.set(tree.x, tree.y + 1.5 * tree.scale, tree.z);
      dummy.rotation.y = tree.rotation;
      dummy.scale.setScalar(tree.scale);
      dummy.updateMatrix();
      trunkRef.current!.setMatrixAt(treeIdx, dummy.matrix);

      // 2. Position Leaves based on pre-calculated static scales
      // Set Lower Canopy
      dummy.position.set(tree.x, tree.y + 3.2 * tree.scale, tree.z);
      dummy.scale.setScalar(tree.leafScale1);
      dummy.rotation.z = Math.sin(time + tree.x) * 0.05;
      dummy.updateMatrix();
      leavesLowerRef.current!.setMatrixAt(treeIdx, dummy.matrix);

      // Set Upper Canopy
      dummy.position.set(tree.x, tree.y + 4.5 * tree.scale, tree.z);
      dummy.scale.setScalar(tree.leafScale2);
      dummy.rotation.z = Math.cos(time + tree.z) * 0.05;
      dummy.updateMatrix();
      leavesUpperRef.current!.setMatrixAt(treeIdx, dummy.matrix);
      
      // Set Shrub
      dummy.position.set(tree.x + 1.5, tree.y + 0.5 * tree.shrubScale, tree.z + 1.5);
      dummy.scale.setScalar(tree.shrubScale);
      dummy.updateMatrix();
      shrubRef.current!.setMatrixAt(treeIdx, dummy.matrix);

      treeIdx++;
    });

    // Hide remaining instances (important to fix the "ghost tree" bug)
    const hideDummy = new THREE.Object3D();
    hideDummy.scale.setScalar(0);
    hideDummy.updateMatrix();
    for (let i = treeIdx; i < TREE_COUNT; i++) {
      trunkRef.current.setMatrixAt(i, hideDummy.matrix);
      leavesLowerRef.current.setMatrixAt(i, hideDummy.matrix);
      leavesUpperRef.current.setMatrixAt(i, hideDummy.matrix);
      shrubRef.current.setMatrixAt(i, hideDummy.matrix);
    }

    trunkRef.current.instanceMatrix.needsUpdate = true;
    leavesLowerRef.current.instanceMatrix.needsUpdate = true;
    leavesUpperRef.current.instanceMatrix.needsUpdate = true;
    shrubRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Trunks - always visible */}
      <instancedMesh ref={trunkRef} args={[undefined, undefined, TREE_COUNT]} castShadow>
        <cylinderGeometry args={[0.05, 0.2, 3, 5]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </instancedMesh>

      {/* Lower Leaves */}
      <instancedMesh ref={leavesLowerRef} args={[undefined, undefined, TREE_COUNT]} castShadow>
        <coneGeometry args={[1.2, 2.5, 6]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.8} />
      </instancedMesh>

      {/* Upper Leaves */}
      <instancedMesh ref={leavesUpperRef} args={[undefined, undefined, TREE_COUNT]} castShadow>
        <coneGeometry args={[0.8, 2, 6]} />
        <meshStandardMaterial color="#388E3C" roughness={0.8} />
      </instancedMesh>

      {/* Shrub Instance */}
      <instancedMesh ref={shrubRef} args={[undefined, undefined, TREE_COUNT]} castShadow>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#689F38" roughness={0.8} />
      </instancedMesh>
    </group>
  );
};
