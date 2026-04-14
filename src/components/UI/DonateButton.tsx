import { useState } from 'react';
import { DonationModal } from './DonationModal';

export const DonateButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="pulse" 
        style={{ 
          position: 'fixed', 
          bottom: '40px', 
          right: '40px', 
          pointerEvents: 'auto',
          zIndex: 100
        }}
      >
        <button 
          className="button-primary" 
          onClick={() => setIsModalOpen(true)}
          style={{ 
            fontSize: '1.2rem', 
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Doar Agora
        </button>
      </div>

      {isModalOpen && <DonationModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
