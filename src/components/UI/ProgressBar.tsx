import { useGameStore } from '../../store/useGameStore';

export const ProgressBar = () => {
  const donationTotal = useGameStore((state) => state.donationTotal);
  const donationProgress = useGameStore((state) => state.donationProgress);

  return (
    <div className="glass" style={{ width: '300px', pointerEvents: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600 }}>Meta de Doação</span>
        <span style={{ color: 'var(--accent)' }}>R$ {donationTotal}</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${donationProgress * 100}%` }} 
        />
      </div>
      <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
        {(donationProgress * 100).toFixed(0)}% da meta alcançada
      </div>
    </div>
  );
};
