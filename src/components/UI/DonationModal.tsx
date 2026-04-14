import { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';

interface DonationModalProps {
  onClose: () => void;
}

export const DonationModal = ({ onClose }: DonationModalProps) => {
  const donate = useGameStore((state) => state.donate);
  const [amount, setAmount] = useState<number>(25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDonate = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      donate(amount);
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const amounts = [10, 25, 50, 100];

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 200, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.8)',
        pointerEvents: 'auto'
      }}
    >
      <div className="glass fade-in" style={{ width: '400px', textAlign: 'center' }}>
        {isSuccess ? (
          <div className="fade-in">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💧</div>
            <h2 style={{ color: 'var(--secondary)' }}>Obrigado!</h2>
            <p>Sua doação ajudará a levar água para quem mais precisa.</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Você verá a transformação do mundo em breve...</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>Faça uma Doação</h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
            </div>
            
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Escolha um valor para ajudar o <br/><strong>Instituto Mais Água</strong>.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {amounts.map((a) => (
                <button 
                  key={a}
                  className="glass"
                  onClick={() => setAmount(a)}
                  style={{ 
                    padding: '1rem', 
                    cursor: 'pointer',
                    borderColor: amount === a ? 'var(--primary)' : 'var(--glass-border)',
                    background: amount === a ? 'rgba(33, 150, 243, 0.2)' : 'var(--glass-bg)'
                  }}
                >
                  R$ {a}
                </button>
              ))}
            </div>

            <button 
              className="button-primary" 
              onClick={handleDonate}
              disabled={isProcessing}
              style={{ width: '100%', padding: '1.2rem' }}
            >
              {isProcessing ? 'Processando...' : `Doar R$ ${amount}`}
            </button>
            
            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '1.5rem' }}>
              Este é um sistema de doação simulado para demonstração.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
