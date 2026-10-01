import React from 'react';
import { TESTIMONIAL } from '../data/products';

export default function Testimonials() {
  return (
    <section className="mt-section-gap px-margin-mobile max-w-container-max mx-auto">
      <div className="glass-card p-8 sm:p-14 text-center relative rounded-sm shadow-[0_8px_32px_rgba(46,7,63,0.3)]">
        <span className="material-symbols-outlined text-secondary text-[48px] opacity-30 mb-4 block mx-auto">
          format_quote
        </span>
        <p className="font-headline-sm italic text-white text-[20px] sm:text-[24px] mb-6 max-w-2xl mx-auto leading-relaxed">
          &ldquo;{TESTIMONIAL.quote}&rdquo;
        </p>
        <p className="font-label-caps text-secondary tracking-widest text-[13px]">
          {TESTIMONIAL.author}
        </p>
        <p className="text-[10px] font-label-caps text-on-surface-variant tracking-wider mt-1">
          {TESTIMONIAL.title}
        </p>
      </div>
    </section>
  );
}
