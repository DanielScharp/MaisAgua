import { useGameStore } from '../../store/useGameStore';

export const CheckpointModal = () => {
  const activeCheckpoint = useGameStore((state) => state.activeCheckpoint);
  const dismissCheckpoint = useGameStore((state) => state.dismissCheckpoint);

  if (!activeCheckpoint) return null;

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 300, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        pointerEvents: 'auto'
      }}
    >
      <div className="glass fade-in" style={{ width: '450px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', fontSize: '3rem' }}>
          📍
        </div>
        
        <h2 style={{ color: 'var(--primary)', marginTop: '1rem' }}>{activeCheckpoint.title}</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          {activeCheckpoint.description}
        </p>

        <button 
          className="button-primary" 
          onClick={dismissCheckpoint}
          style={{ width: '100%' }}
        >
          Continuar Jornada
        </button>
      </div>
    </div>
  );
};
