import React, { useState } from 'react';
import api from '../services/api';

export default function CheckoutModal({
  isOpen,
  onClose,
  items = [],
  appliedPromoCode = '',
  onOrderSuccess,
  showToast
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    paymentMethod: 'Aurelian VIP Concierge Wire',
    giftWrap: true,
    giftMessage: '',
  });

  const [promoInput, setPromoInput] = useState(appliedPromoCode || '');
  const [promoDetails, setPromoDetails] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // Validate Promo Code
  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoError('');
    try {
      const res = await api.validatePromo(promoInput.trim(), subtotal);
      if (res.valid) {
        setPromoDetails(res.data);
        showToast?.(`Privilege code ${res.data.code} applied!`);
      } else {
        setPromoError(res.message || 'Invalid privilege code');
      }
    } catch (err) {
      setPromoError(err.message || 'Failed to validate code');
    }
  };

  const discountAmount = promoDetails ? promoDetails.calculatedDiscount : 0;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableSubtotal * 0.0825 * 100) / 100;
  const grandTotal = Math.round((taxableSubtotal + tax) * 100) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email) {
      showToast?.('Please provide your name and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address || 'Private Suite',
          city: formData.city || 'Metropolis',
          country: formData.country,
          postalCode: formData.postalCode,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        promoCode: promoDetails ? promoDetails.code : (appliedPromoCode || null),
        paymentMethod: formData.paymentMethod,
        giftWrap: formData.giftWrap,
        giftMessage: formData.giftMessage,
      };

      const res = await api.createOrder(payload);
      if (res.success && res.data) {
        setConfirmedOrder(res.data);
        onOrderSuccess?.(res.data);
        showToast?.(`Order ${res.data.orderNumber} successfully registered.`);
      }
    } catch (err) {
      showToast?.(err.message || 'Error processing your acquisition.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-surface-container-lowest/85 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-surface-container-low border border-secondary/30 rounded-sm shadow-[0_20px_50px_rgba(46,7,63,0.9)] max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-10 text-on-surface">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-secondary p-1 transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-[26px]">close</span>
        </button>

        {confirmedOrder ? (
          /* Confirmation State */
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 border border-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-[36px] filled">
                verified
              </span>
            </div>
            <div>
              <p className="font-label-caps text-secondary text-label-caps tracking-widest uppercase">
                ACQUISITION CONFIRMED
              </p>
              <h3 className="font-headline-md text-white text-[28px] mt-2">
                Thank You, {confirmedOrder.customer.firstName}
              </h3>
              <p className="text-on-surface-variant font-body-md text-[14px] mt-2 max-w-md mx-auto">
                Your order has been recorded in the Maison Aurelian registry. A confirmation and tracking dossier have been dispatched to {confirmedOrder.customer.email}.
              </p>
            </div>

            <div className="bg-surface-container p-6 rounded-sm border border-outline-variant/30 text-left space-y-3 font-body-md text-[13px]">
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">Order Number</span>
                <span className="font-semibold text-secondary font-mono">
                  {confirmedOrder.orderNumber}
                </span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">Courier Tracking</span>
                <span className="font-mono text-white">
                  {confirmedOrder.trackingNumber}
                </span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/20 pb-2">
                <span className="text-on-surface-variant">Status</span>
                <span className="text-secondary font-semibold">
                  {confirmedOrder.status}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant">Total Amount</span>
                <span className="font-headline-sm text-secondary text-[18px]">
                  ${confirmedOrder.pricing.total.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-secondary text-on-secondary py-4 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_20px_rgba(233,195,73,0.4)] transition-all"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="border-b border-outline-variant/20 pb-4 mb-6">
              <span className="font-label-caps text-secondary text-[11px] tracking-widest uppercase">
                AURELIAN PRIVATE CLIENT
              </span>
              <h3 className="font-headline-md text-white text-[24px] sm:text-[28px]">
                Secure VIP Concierge Checkout
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Order Items Preview */}
              <div className="bg-surface-container/60 p-4 rounded-sm border border-outline-variant/20 space-y-2">
                <div className="flex justify-between items-center text-xs font-label-caps text-on-surface-variant">
                  <span>ITEMS IN BAG ({items.length})</span>
                  <span>SUBTOTAL</span>
                </div>
                <div className="max-h-32 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm py-1">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-8 h-8 rounded-sm object-cover border border-outline-variant/30"
                        />
                        <span className="text-white truncate max-w-[200px] sm:max-w-[280px]">
                          {item.name} (x{item.quantity})
                        </span>
                      </div>
                      <span className="text-secondary font-medium">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo code bar */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Enter Privilege Code (e.g. AURELIAN15)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  className="flex-1 bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary transition-colors"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-surface-container-high text-secondary border border-secondary/40 px-4 py-2.5 rounded-sm text-xs font-label-caps hover:bg-secondary hover:text-on-secondary transition-colors"
                >
                  APPLY
                </button>
              </div>
              {promoError && (
                <p className="text-xs text-error">{promoError}</p>
              )}
              {promoDetails && (
                <div className="p-2.5 bg-secondary/10 border border-secondary/30 rounded-sm text-xs text-secondary flex justify-between">
                  <span>{promoDetails.description}</span>
                  <span className="font-bold">-${promoDetails.calculatedDiscount.toLocaleString()}</span>
                </div>
              )}

              {/* Client Details */}
              <div className="space-y-4">
                <h4 className="font-label-caps text-secondary text-xs tracking-widest uppercase">
                  Client Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      First Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Genevieve"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="de Saint-Germain"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="client@prestige.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      Direct Telephone
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2831"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="Penthouse Suite, 740 Park Avenue"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-on-surface-variant mb-1 font-label-caps">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="10021"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-surface-container border border-outline-variant/40 px-3 py-2.5 rounded-sm text-sm text-white focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <h4 className="font-label-caps text-secondary text-xs tracking-widest uppercase">
                  Settlement Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    'Aurelian VIP Concierge Wire',
                    'Private Vault Card',
                    'Encrypted Crypto Treasury',
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`p-3 rounded-sm text-xs text-left border transition-all ${
                        formData.paymentMethod === method
                          ? 'border-secondary bg-secondary/15 text-white font-medium shadow-[0_0_10px_rgba(233,195,73,0.2)]'
                          : 'border-outline-variant/30 bg-surface-container text-on-surface-variant hover:border-outline'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gift Presentation */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.giftWrap}
                    onChange={(e) => setFormData({ ...formData, giftWrap: e.target.checked })}
                    className="w-4 h-4 rounded text-secondary focus:ring-0 accent-[#e9c349]"
                  />
                  <span className="text-xs text-on-surface">
                    Complimentary Imperial Plum Velvet Box & Wax-Sealed Calligraphy Card
                  </span>
                </label>
              </div>

              {/* Pricing Summary */}
              <div className="bg-surface-container-high/60 p-4 rounded-sm border border-outline-variant/30 space-y-2 text-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-secondary">
                    <span>Privilege Discount ({promoDetails?.code})</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-on-surface-variant">
                  <span>Complimentary Insured Courier Delivery</span>
                  <span className="text-secondary font-medium">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Estimated Luxury Sales Tax (8.25%)</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-outline-variant/20 font-semibold text-white">
                  <span className="font-headline-sm text-[16px]">Total Acquisition</span>
                  <span className="font-headline-sm text-secondary text-[20px]">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-on-secondary py-4 font-label-caps text-label-caps tracking-widest hover:shadow-[0_0_25px_rgba(233,195,73,0.5)] active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'TRANSMITTING ACQUISITION TO MAISON...' : 'AUTHORIZE ACQUISITION'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
