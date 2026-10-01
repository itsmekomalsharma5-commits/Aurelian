import React from 'react';
import { HERO_IMAGE } from '../data/products';

export default function Hero({ onShopNow }) {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 hover:scale-105"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        role="img"
        aria-label="A cinematic, high-fashion close-up of a model wearing a majestic amethyst and diamond necklace"
      />
      <div className="absolute inset-0 hero-vignette pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-full px-margin-mobile text-center z-10">
        <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-widest">
          THE HERITAGE COLLECTION
        </p>
        <h2 className="font-display-lg-mobile text-display-lg-mobile md:text-display-lg text-white mb-8">
          Timeless Elegance, <br />
          Made to Shine
        </h2>
        <button
          onClick={onShopNow}
          className="bg-secondary text-on-secondary px-10 py-4 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_25px_rgba(233,195,73,0.5)] active:scale-95 transition-all duration-500 rounded-sm cursor-pointer"
        >
          SHOP NOW
        </button>
      </div>
    </section>
  );
}
