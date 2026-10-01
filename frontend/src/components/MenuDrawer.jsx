import React from 'react';
import { LOGO_URL, NAV_LINKS } from '../data/products';

export default function MenuDrawer({
  isOpen,
  onClose,
  onSelectCategory,
  onBookConsultation,
  onOpenAuth,
  onOpenProfile,
  currentUser,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-surface-container-low border-r border-outline-variant/30 h-full p-6 flex flex-col justify-between z-10 shadow-[8px_0_30px_rgba(46,7,63,0.6)]">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="AURELIAN Logo" className="h-8 w-auto" />
              <span className="font-display-lg text-[20px] tracking-tight text-secondary">
                AURELIAN
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-secondary p-1 transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <nav className="mt-8 space-y-5">
            <p className="font-label-caps text-[11px] text-secondary tracking-widest uppercase">
              Collections
            </p>
            <button
              onClick={() => {
                onSelectCategory?.('all');
                onClose();
              }}
              className="block w-full text-left text-on-surface hover:text-secondary font-headline-sm text-[18px] transition-colors"
            >
              High Jewelry
            </button>
            <button
              onClick={() => {
                onSelectCategory?.('rings');
                onClose();
              }}
              className="block w-full text-left text-on-surface hover:text-secondary font-headline-sm text-[18px] transition-colors"
            >
              Royal Rings
            </button>
            <button
              onClick={() => {
                onSelectCategory?.('necklaces');
                onClose();
              }}
              className="block w-full text-left text-on-surface hover:text-secondary font-headline-sm text-[18px] transition-colors"
            >
              Imperial Necklaces
            </button>
            <button
              onClick={() => {
                onSelectCategory?.('earrings');
                onClose();
              }}
              className="block w-full text-left text-on-surface hover:text-secondary font-headline-sm text-[18px] transition-colors"
            >
              Earrings & Chandelier
            </button>
            <button
              onClick={() => {
                onSelectCategory?.('watches');
                onClose();
              }}
              className="block w-full text-left text-on-surface hover:text-secondary font-headline-sm text-[18px] transition-colors"
            >
              Timepieces
            </button>

            {/* VIP Client Portal Entry */}
            <div className="pt-6 border-t border-outline-variant/20 space-y-2">
              <p className="font-label-caps text-[11px] text-secondary tracking-widest uppercase">
                VIP Client Portal
              </p>
              {currentUser ? (
                <button
                  onClick={() => {
                    onClose();
                    onOpenProfile?.();
                  }}
                  className="flex items-center gap-2 text-left text-white hover:text-secondary font-body-md text-[14px] transition-colors w-full cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    account_circle
                  </span>
                  <span className="truncate">
                    {currentUser.firstName} ({currentUser.tier || 'VIP Sovereign'})
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth?.();
                  }}
                  className="flex items-center gap-2 text-left text-secondary hover:text-secondary-fixed font-body-md text-[14px] transition-colors w-full cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    login
                  </span>
                  <span>Sign In / Join the Maison</span>
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-outline-variant/20 space-y-3">
              <p className="font-label-caps text-[11px] text-secondary tracking-widest uppercase">
                Maison Services
              </p>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className="block text-on-surface-variant hover:text-secondary font-body-md text-[14px] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="pt-6 border-t border-outline-variant/20">
          <button
            onClick={() => {
              onClose();
              onBookConsultation?.();
            }}
            className="w-full bg-secondary text-on-secondary py-3 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_15px_rgba(233,195,73,0.4)] transition-all cursor-pointer"
          >
            BOOK PRIVATE CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
}
