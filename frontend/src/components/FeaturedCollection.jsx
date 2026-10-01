import React from 'react';

export default function FeaturedCollection({ onDiscoverMore }) {
  return (
    <section
      id="collection"
      className="mt-section-gap py-20 px-margin-mobile relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-[#4c1d63] to-surface-container-lowest" />
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <h3 className="font-display-lg-mobile text-[32px] md:text-[40px] text-white mb-6">
          The Royal Amethyst
        </h3>
        <p className="font-body-md text-on-surface-variant max-w-md mx-auto mb-10 leading-relaxed">
          A tribute to heritage and nobility, featuring the world&apos;s most sought-after
          deep purple gemstones set in 18k recycled gold.
        </p>
        <div className="flex justify-center items-center mb-10">
          <div className="w-24 h-[1px] bg-secondary/50" />
          <div className="diamond-bullet mx-4" />
          <div className="w-24 h-[1px] bg-secondary/50" />
        </div>
        <button
          onClick={onDiscoverMore}
          className="border border-secondary text-secondary px-8 py-3 font-label-caps text-label-caps tracking-widest hover:bg-secondary hover:text-on-secondary transition-all duration-500 rounded-sm cursor-pointer"
        >
          DISCOVER MORE
        </button>
      </div>

      {/* Ambient Decorative Lighting */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
