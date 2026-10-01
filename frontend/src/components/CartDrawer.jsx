import React from 'react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-container-lowest/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface-container-low border-l border-outline-variant/30 h-full p-6 flex flex-col justify-between z-10 shadow-[-8px_0_30px_rgba(46,7,63,0.6)]">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                shopping_bag
              </span>
              <h3 className="font-headline-sm text-[20px] text-white tracking-wide">
                Your Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-secondary p-1 transition-colors"
              aria-label="Close bag"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <span className="material-symbols-outlined text-secondary/40 text-[48px] mb-3">
                  shopping_bag
                </span>
                <p className="font-body-md text-on-surface-variant text-[15px]">
                  Your shopping bag is currently empty.
                </p>
                <p className="font-label-caps text-[11px] text-secondary mt-2">
                  EXPLORE OUR HIGH JEWELRY COLLECTION
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-surface-container rounded-sm border border-outline-variant/20 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-sm border border-outline-variant/30"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body-md font-semibold text-white text-[14px] truncate">
                      {item.name}
                    </h4>
                    <p className="text-secondary text-[13px] font-medium">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-outline-variant/40 rounded-sm">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-on-surface hover:text-secondary text-sm"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-on-surface hover:text-secondary text-sm"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-on-surface-variant hover:text-error transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-outline-variant/20 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body-md text-on-surface-variant text-[14px]">
                Subtotal
              </span>
              <span className="font-headline-sm text-secondary text-[22px]">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant/70">
              Taxes and complimentary insured courier shipping calculated at checkout.
            </p>
            <button
              onClick={onCheckout}
              className="w-full bg-secondary text-on-secondary py-4 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] transition-all duration-300"
            >
              PROCEED TO SECURE CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
