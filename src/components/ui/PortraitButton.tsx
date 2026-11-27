import { useRef, useState } from 'react';
import { portraitUrl } from '../../data/site';
import PortraitModal from './PortraitModal';

export default function PortraitButton() {
  const [portraitOpen, setPortraitOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="logo-avatar"
        aria-label="View Ronnie Galindo’s full portrait"
        aria-haspopup="dialog"
        title="View full photo"
        onClick={() => setPortraitOpen(true)}
      >
        <img src={portraitUrl} alt="" width={52} height={52} decoding="async" />
      </button>
      {portraitOpen && (
        <PortraitModal onClose={() => setPortraitOpen(false)} returnFocusRef={triggerRef} />
      )}
    </>
  );
}
