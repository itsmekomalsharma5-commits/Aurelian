import React from 'react';
import { LOGO_URL } from '../data/products';

export default function Navbar({
  onOpenMenu,
  onOpenCart,
  onOpenAuth,
  onOpenProfile,
  currentUser,
  cartCount = 0,
}) {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_8px_30px_rgb(46,7,63,0.4)] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
      {/* Left Menu & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMenu}
          className="flex items-center justify-center p-1 rounded-sm text-secondary hover:text-secondary-fixed transition-colors"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined cursor-pointer text-[26px]">
            menu
          </span>
        </button>
        <a href="#" className="flex items-center gap-2">
          <img
            alt="AURELIAN Logo"
            className="h-10 w-auto"
            src={LOGO_URL}
          />
        </a>
      </div>

      {/* Center Title */}
      <a href="#">
        <h1 className="font-display-lg-mobile text-[24px] tracking-tighter text-secondary select-none">
          AURELIAN
        </h1>
      </a>

      {/* Right Icons: VIP Account & Shopping Bag */}
      <div className="flex items-center gap-3 sm:gap-4">
        {currentUser ? (
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 py-1 px-2.5 rounded-full border border-secondary/40 bg-secondary/10 hover:bg-secondary/20 transition-all cursor-pointer"
            aria-label="View VIP Profile"
          >
            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary font-bold text-xs flex items-center justify-center">
              {currentUser.firstName ? currentUser.firstName[0] : 'V'}
            </div>
            <span className="hidden sm:inline font-label-caps text-[11px] text-secondary tracking-wider">
              {currentUser.firstName}
            </span>
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 text-secondary hover:text-secondary-fixed transition-colors py-1 px-2 rounded-sm cursor-pointer"
            aria-label="Sign in to Salon"
          >
            <span className="material-symbols-outlined text-[24px]">
              account_circle
            </span>
            <span className="hidden sm:inline font-label-caps text-[11px] tracking-wider">
              SIGN IN
            </span>
          </button>
        )}

        <button
          onClick={onOpenCart}
          className="relative flex items-center justify-center p-1 rounded-sm text-secondary hover:text-secondary-fixed transition-colors"
          aria-label="Open shopping bag"
        >
          <span className="material-symbols-outlined text-secondary text-[26px]">
            shopping_bag
          </span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-on-secondary text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
