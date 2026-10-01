import React from 'react';
import { NEW_ARRIVALS } from '../data/products';

export default function NewArrivals({ onAddToCart, onToggleWishlist, wishlist = [], items }) {
  const displayItems = items && items.length > 0 ? items : NEW_ARRIVALS;

  return (
    <section id="new-arrivals" className="mt-section-gap px-margin-mobile max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="font-headline-md text-headline-md">New Arrivals</h3>
          <p className="text-on-surface-variant font-body-md">
            Exclusively crafted for this season
          </p>
        </div>
        <a
          href="#collection"
          className="text-secondary font-label-caps text-label-caps border-b border-secondary/30 pb-1 hover:border-secondary transition-colors"
        >
          VIEW ALL
        </a>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar scroll-smooth">
        {displayItems.map((product) => {
          const isWishlisted = wishlist.includes(product.id);

          return (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] flex-shrink-0 group"
            >
              <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-surface-container-high rounded-sm border border-transparent group-hover:border-secondary/20 transition-all duration-500">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={product.image}
                  alt={product.alt}
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 bg-secondary/90 text-on-secondary px-3 py-1 text-[10px] font-label-caps tracking-widest rounded-sm">
                    {product.badge}
                  </div>
                )}
                {/* Wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors duration-300 ${
                    isWishlisted
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-white/10 text-white hover:bg-secondary/80 hover:text-on-secondary'
                  }`}
                  aria-label="Wishlist item"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isWishlisted ? 'filled' : ''
                    }`}
                  >
                    favorite
                  </span>
                </button>

                {/* Quick Add Button */}
                <button
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-secondary hover:text-on-secondary active:scale-95 transition-all duration-300 shadow-lg cursor-pointer"
                  aria-label={`Add ${product.name} to shopping bag`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    shopping_bag
                  </span>
                </button>
              </div>

              <h4 className="font-headline-sm text-[18px] mb-1 group-hover:text-secondary transition-colors duration-300">
                {product.name}
              </h4>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-body-lg font-semibold">
                  ${product.price.toLocaleString()}
                </span>
                <div className="flex items-center text-secondary-fixed text-[12px]">
                  <span
                    className="material-symbols-outlined text-[14px] filled"
                  >
                    star
                  </span>
                  <span className="ml-1 font-medium">{product.rating}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
