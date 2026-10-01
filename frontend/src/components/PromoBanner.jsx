import React from 'react';

export default function PromoBanner({ onRedeemOffer }) {
  return (
    <section className="mt-section-gap px-margin-mobile max-w-container-max mx-auto">
      <div className="gold-border-gradient p-8 sm:p-12 text-center relative overflow-hidden rounded-sm">
        <div className="absolute top-0 right-0 p-3">
          <div className="diamond-bullet opacity-30" />
        </div>
        <div className="absolute bottom-0 left-0 p-3">
          <div className="diamond-bullet opacity-30" />
        </div>

        <p className="font-label-caps text-label-caps text-secondary mb-2 tracking-widest uppercase">
          SEASONAL OFFER
        </p>
        <h4 className="font-headline-sm text-[26px] sm:text-[32px] text-white mb-4">
          Gifts of Brilliance
        </h4>
        <p className="font-body-md text-on-surface-variant max-w-lg mx-auto mb-6">
          Enjoy 15% off on your first collection purchase when you join our elite circle.
        </p>
        <button
          onClick={onRedeemOffer}
          className="text-secondary font-label-caps text-label-caps border-b border-secondary pb-1 hover:text-secondary-fixed hover:border-secondary-fixed transition-colors duration-300 cursor-pointer"
        >
          REDEEM OFFER
        </button>
      </div>
    </section>
  );
}
