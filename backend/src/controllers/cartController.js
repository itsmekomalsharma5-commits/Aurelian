import { db } from '../services/db.js';
import { config } from '../config/index.js';

function calculateCartTotals(items = [], appliedPromo = null) {
  const subtotal = items.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  
  let discountAmount = 0;
  let promoDetails = null;

  if (appliedPromo) {
    const promo = db.getPromotion(appliedPromo);
    if (promo && subtotal >= promo.minOrderAmount) {
      if (promo.discountType === 'percentage') {
        discountAmount = Math.round((subtotal * (promo.discountValue / 100)) * 100) / 100;
      } else if (promo.discountType === 'fixed') {
        discountAmount = Math.min(promo.discountValue, subtotal);
      }
      promoDetails = {
        code: promo.code,
        description: promo.description,
        discountAmount
      };
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * config.taxRate) * 100) / 100;
  const shippingFee = config.standardShippingFee;
  const total = Math.round((taxableAmount + taxAmount + shippingFee) * 100) / 100;

  return {
    subtotal,
    discountAmount,
    promoDetails,
    taxAmount,
    shippingFee,
    shippingLabel: 'Complimentary Insured Courier',
    total,
    totalItems: items.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
  };
}

export const getCart = (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required.' });
    }
    const cart = db.getCart(sessionId);
    const totals = calculateCartTotals(cart.items, cart.appliedPromo);
    res.json({
      success: true,
      data: {
        ...cart,
        totals
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCart = (req, res) => {
  try {
    const { sessionId } = req.params;
    const { items, appliedPromo } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: 'Session ID is required.' });
    }

    const currentCart = db.getCart(sessionId);
    const updatedItems = items !== undefined ? items : currentCart.items;
    const updatedPromo = appliedPromo !== undefined ? appliedPromo : currentCart.appliedPromo;

    const savedCart = db.saveCart(sessionId, {
      items: updatedItems,
      appliedPromo: updatedPromo
    });

    const totals = calculateCartTotals(savedCart.items, savedCart.appliedPromo);
    res.json({
      success: true,
      data: {
        ...savedCart,
        totals
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const clearCart = (req, res) => {
  try {
    const { sessionId } = req.params;
    db.clearCart(sessionId);
    res.json({ success: true, message: 'Cart cleared successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
