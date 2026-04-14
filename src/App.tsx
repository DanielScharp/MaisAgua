import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';

import { Terrain } from './components/World/Terrain';
import { Vegetation } from './components/World/Vegetation';
import { Water } from './components/World/Water';
import { Player } from './components/Player/Player';
import { CameraRig } from './components/Player/CameraRig';
import { Lighting } from './components/Environment/Lighting';
import { Atmosphere } from './components/Environment/Atmosphere';
import { AudioManager } from './components/Environment/AudioManager';

import { checkpoints } from './components/Checkpoints/CheckpointData';
import { Checkpoint } from './components/Checkpoints/Checkpoint';

import { UIOverlay } from './components/UI/UIOverlay';

function App() {
  return (
    <div id="app-container" style={{ width: '100vw', height: '100vh', background: '#000', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 5, -10], fov: 50 }}>
        <Suspense fallback={null}>
          <Lighting />
          <Atmosphere />
          <AudioManager />
          
          <Terrain />
          <Vegetation />
          <Water />
          
          {checkpoints.map((cp) => (
            <Checkpoint key={cp.id} data={cp} />
          ))}
          
          <Player />
          
          <CameraRig />
          
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
        </Suspense>
      </Canvas>
      
      <UIOverlay />
    </div>
  );
}

export default App;
