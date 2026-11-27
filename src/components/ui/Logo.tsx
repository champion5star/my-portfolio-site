import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { portraitUrl } from '../../data/site';
import PortraitModal from './PortraitModal';

interface LogoProps {
  showName?: boolean;
}

export default function Logo({ showName = false }: LogoProps) {
  const [portraitOpen, setPortraitOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return (
    <div className="logo">
      <button
        ref={triggerRef}
        type="button"
        className="logo-avatar"
        aria-label="View Ronnie Galindo’s full portrait"
        aria-haspopup="dialog"
        onClick={() => setPortraitOpen(true)}
      >
        <img src={portraitUrl} alt="" width={52} height={52} decoding="async" />
      </button>
      {showName && (
        <Link to="/" className="logo-name" aria-label="Ronnie Galindo home">
          Ronnie Galindo
        </Link>
      )}
      {portraitOpen && (
        <PortraitModal onClose={() => setPortraitOpen(false)} returnFocusRef={triggerRef} />
      )}
    </div>
  );
}
