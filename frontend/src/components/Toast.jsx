import React, { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-24 right-4 z-50 max-w-sm w-full animate-bounce-in">
      <div className="glass-card bg-surface-container-high/95 border border-secondary/40 text-on-surface p-4 rounded-sm shadow-[0_8px_32px_rgba(46,7,63,0.8)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary filled text-[20px]">
            check_circle
          </span>
          <p className="font-body-md text-[13px] tracking-wide text-on-surface">
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-on-surface-variant hover:text-secondary transition-colors"
          aria-label="Close notification"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
