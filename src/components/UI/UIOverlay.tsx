import { ProgressBar } from './ProgressBar';
import { HUD } from './HUD';
import { DonateButton } from './DonateButton';
import { CheckpointModal } from './CheckpointModal';

export const UIOverlay = () => {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 50, 
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        boxSizing: 'border-box'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <HUD />
        <ProgressBar />
      </div>
      
      <DonateButton />
      <CheckpointModal />
    </div>
  );
};
