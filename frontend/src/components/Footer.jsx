import React from 'react';
import { LOGO_URL, NAV_LINKS } from '../data/products';

export default function Footer() {
  return (
    <footer className="w-full mt-section-gap border-t border-outline-variant/30 bg-surface-container-lowest flex flex-col items-center gap-gutter py-20 px-margin-mobile text-center">
      <img
        alt="AURELIAN Logo"
        className="h-16 w-auto mb-4 opacity-80 transition-opacity hover:opacity-100"
        src={LOGO_URL}
      />
      <h4 className="font-display-lg text-[28px] text-secondary tracking-tighter">
        AURELIAN
      </h4>
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-4 max-w-lg">
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            className="text-on-surface-variant hover:text-secondary transition-colors duration-300 text-body-md"
            href={link.href}
          >
            {link.name}
          </a>
        ))}
      </nav>
      <div className="flex gap-6 mt-6">
        <a
          href="#share"
          aria-label="Share Aurelian"
          className="text-secondary/60 hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined">share</span>
        </a>
        <a
          href="#global"
          aria-label="Global Maison network"
          className="text-secondary/60 hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined">public</span>
        </a>
        <a
          href="mailto:concierge@aurelianheritage.com"
          aria-label="Email Maison Concierge"
          className="text-secondary/60 hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined">mail</span>
        </a>
      </div>
      <p className="font-body-md text-[12px] text-on-surface-variant/50 mt-10 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} AURELIAN HERITAGE. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}
