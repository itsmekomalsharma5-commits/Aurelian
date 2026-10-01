import React from 'react';
import { CATEGORIES } from '../data/products';

export default function Categories({ onSelectCategory, items }) {
  const source = items && items.length > 0 ? items : CATEGORIES;
  const largeCategory = source.find((c) => c.isLarge);
  const smallCategories = source.filter((c) => !c.isLarge);

  return (
    <section id="categories" className="mt-section-gap px-margin-mobile max-w-container-max mx-auto">
      <h3 className="font-headline-md text-headline-md text-center mb-10">
        Curated Categories
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Large card */}
        {largeCategory && (
          <div
            onClick={() => onSelectCategory?.(largeCategory.id)}
            className="col-span-2 relative h-48 sm:h-64 overflow-hidden rounded-sm group cursor-pointer border border-transparent hover:border-secondary/30 transition-all duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${largeCategory.image}')` }}
              role="img"
              aria-label={largeCategory.alt}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
              <span className="font-headline-sm text-headline-sm text-white tracking-wide group-hover:text-secondary transition-colors duration-300">
                {largeCategory.title}
              </span>
            </div>
          </div>
        )}

        {/* Small cards */}
        {smallCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory?.(category.id)}
            className="relative h-40 sm:h-52 overflow-hidden rounded-sm group cursor-pointer border border-transparent hover:border-secondary/30 transition-all duration-500"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url('${category.image}')` }}
              role="img"
              aria-label={category.alt}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
              <span className="font-headline-sm text-headline-sm text-white tracking-wide group-hover:text-secondary transition-colors duration-300">
                {category.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
