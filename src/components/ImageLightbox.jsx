import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ImageLightbox.css';

export default function ImageLightbox({ src, alt = '', onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const lightbox = (
    <div
      className="image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="View image"
      onClick={onClose}
    >
      <button
        type="button"
        className="image-lightbox__close"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
      <div className="image-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="image-lightbox__img" draggable={false} />
      </div>
    </div>
  );

  return createPortal(lightbox, document.body);
}
