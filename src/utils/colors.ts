import * as THREE from 'three';

export const ZONES = {
  1: {
    terrain: new THREE.Color('#C2A66B'), // Sandy
    secondary: new THREE.Color('#8B7355'), // Darker earth
  },
  2: {
    terrain: new THREE.Color('#8B9A6B'), // Transitional green
    secondary: new THREE.Color('#6B8E3F'), // Olive
  },
  3: {
    terrain: new THREE.Color('#4CAF50'), // Rich green
    secondary: new THREE.Color('#2E7D32'), // Deep forest green
  },
};

export const lerpColors = (color1: THREE.Color, color2: THREE.Color, alpha: number) => {
  return new THREE.Color().copy(color1).lerp(color2, alpha);
};

export const getProgressiveColor = (progress: number) => {
  if (progress < 0.33) {
    const alpha = progress / 0.33;
    return lerpColors(ZONES[1].terrain, ZONES[1].secondary, alpha);
  } else if (progress < 0.66) {
    const alpha = (progress - 0.33) / 0.33;
    return lerpColors(ZONES[1].secondary, ZONES[2].secondary, alpha);
  } else {
    const alpha = (progress - 0.66) / 0.34;
    return lerpColors(ZONES[2].secondary, ZONES[3].secondary, alpha);
  }
};
