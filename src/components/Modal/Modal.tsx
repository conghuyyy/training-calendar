import './Modal.css';
import { useEffect, useRef } from 'react';
import { noop } from 'utils/helpers';
import type { FunctionComponent, ReactNode } from 'react';

const Modal: FunctionComponent<{
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  children: ReactNode;
}> = ({ isOpen, onClose = noop, title, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal__overlay"
      ref={overlayRef}
      onClick={(event) => {
        if (event.target === overlayRef.current) {
          onClose();
        }
      }}
    >
      <div className="modal__content">
        <div className="modal__header">
          <h3 className="modal__title">{title}</h3>
          <button className="modal__close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
