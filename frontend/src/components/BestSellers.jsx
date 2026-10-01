import React from 'react';
import { BEST_SELLERS } from '../data/products';

export default function BestSellers({ onAddToCart, onToggleWishlist, wishlist = [], items }) {
  const displayItems = items && items.length > 0 ? items : BEST_SELLERS;

  return (
    <section id="best-sellers" className="mt-section-gap px-margin-mobile max-w-container-max mx-auto">
      <h3 className="font-headline-md text-headline-md text-center mb-12">
        The Best of Aurelian
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
        {displayItems.map((item) => {
          const isWishlisted = wishlist.includes(item.id);

          return (
            <div key={item.id} className="space-y-3 group">
              <div className="relative aspect-square bg-surface-container-low overflow-hidden rounded-sm border border-transparent group-hover:border-secondary/30 transition-all duration-500">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.image}
                  alt={item.alt}
                />
                {/* Wishlist toggle */}
                <button
                  onClick={() => onToggleWishlist(item.id)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors duration-300 ${
                    isWishlisted
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-black/30 text-white hover:bg-secondary hover:text-on-secondary'
                  }`}
                  aria-label="Wishlist item"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isWishlisted ? 'filled' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>

                {/* Quick Add Button */}
                <button
                  onClick={() => onAddToCart(item)}
                  className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md text-white p-2 rounded-full hover:bg-secondary hover:text-on-secondary active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-label={`Add ${item.name} to shopping bag`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    shopping_bag
                  </span>
                </button>
              </div>

              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant tracking-wider">
                  {item.category}
                </p>
                <h5 className="font-body-md font-semibold text-[14px] text-white group-hover:text-secondary transition-colors duration-300 truncate">
                  {item.name}
                </h5>
                <p className="text-secondary text-[14px] font-medium">
                  ${item.price.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
