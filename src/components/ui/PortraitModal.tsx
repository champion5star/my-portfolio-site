import { useEffect, useId, useRef } from 'react';
import type { RefObject } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { portraitUrl } from '../../data/site';

interface PortraitModalProps {
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export default function PortraitModal({ onClose, returnFocusRef }: PortraitModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current!;
    const previousFocus = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [returnFocusRef]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="portrait-modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={(event) => {
        // Strict Mode can replay the effect: a queued close event from cleanup
        // must not dismiss a dialog that has already been opened again.
        if (!event.currentTarget.open) onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="portrait-modal-content">
        <div className="portrait-modal-header">
          <h2 id={titleId}>Ronnie Galindo</h2>
          <button type="button" className="portrait-modal-cancel" onClick={onClose} autoFocus>
            <X size={17} aria-hidden="true" /> Cancel
          </button>
        </div>
        <img
          className="portrait-modal-image"
          src={portraitUrl}
          alt="Ronnie Galindo wearing a navy blazer in a modern office"
          width={1672}
          height={941}
        />
      </div>
    </dialog>,
    document.body,
  );
}
