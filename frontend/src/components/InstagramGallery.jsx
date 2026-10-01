import React from 'react';
import { INSTAGRAM_IMAGES } from '../data/products';

export default function InstagramGallery() {
  return (
    <section className="mt-section-gap max-w-container-max mx-auto">
      <div className="px-margin-mobile mb-8 text-center">
        <h3 className="font-headline-md text-headline-md">Follow The Maison</h3>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface-variant hover:text-secondary font-body-md transition-colors"
        >
          @aurelianheritage
        </a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 sm:gap-2 px-2">
        {INSTAGRAM_IMAGES.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden group cursor-pointer bg-surface-container-low"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              src={item.image}
              alt={item.alt}
            />
            <div className="absolute inset-0 bg-primary-container/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[24px]">
                photo_camera
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
