import { useRef, useState } from 'react';
import { portraitUrl } from '../../data/site';
import PortraitModal from './PortraitModal';

interface PortraitButtonProps {
  variant?: 'logo' | 'profile';
}

export default function PortraitButton({ variant = 'logo' }: PortraitButtonProps) {
  const [portraitOpen, setPortraitOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const size = variant === 'profile' ? 220 : 52;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`logo-avatar${variant === 'profile' ? ' portrait-avatar' : ''}`}
        aria-label="View Ronnie Galindo’s full portrait"
        aria-haspopup="dialog"
        title="View full photo"
        onClick={() => setPortraitOpen(true)}
      >
        <img src={portraitUrl} alt="" width={size} height={size} decoding="async" />
      </button>
      {portraitOpen && (
        <PortraitModal onClose={() => setPortraitOpen(false)} returnFocusRef={triggerRef} />
      )}
    </>
  );
}
