export const getTerrainHeight = (x: number, z: number) => {
  // Matches the logic in Terrain.tsx
  // We use the same formula to ensure the player and objects snap to the mesh
  const height = Math.sin(x * 0.2) * Math.cos(z * 0.1) * 2;
  return height;
};
