import { useGameStore } from '../../store/useGameStore';
import { useProgress } from '../../hooks/useProgress';

export const HUD = () => {
  const { currentZone } = useProgress();
  const playerPosition = useGameStore((state) => state.playerPosition);

  const zones = [
    { id: 1, name: 'Sertão Árido', color: '#C2A66B' },
    { id: 2, name: 'Transição', color: '#8B9A6B' },
    { id: 3, name: 'Sertão Fértil', color: '#4CAF50' },
  ];

  return (
    <div className="fade-in" style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="glass" style={{ padding: '0.8rem 1.2rem' }}>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.7 }}>Zona Atual</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: zones[currentZone - 1].color }}>
          {zones[currentZone - 1].name}
        </div>
      </div>

      <div className="glass" style={{ padding: '0.8rem 1.2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
          <span style={{ fontSize: '0.8rem' }}>Posição: Z {Math.floor(playerPosition[2])}m</span>
        </div>
      </div>

      <div style={{ marginTop: 'auto', opacity: 0.6, fontSize: '0.7rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        <div>[W/S] Mover &nbsp; [A/D] Lados</div>
        <div>[Shift] Correr &nbsp; [Espaço] Pular</div>
      </div>
    </div>
  );
};
