import { db } from '../services/db.js';

export const validatePromo = (req, res) => {
  try {
    const { code, amount } = req.query;

    if (!code) {
      return res.status(400).json({ success: false, message: 'Promo code is required.' });
    }

    const promo = db.getPromotion(code);
    if (!promo) {
      return res.status(404).json({
        success: false,
        valid: false,
        message: `Promo code "${code}" is invalid or expired.`
      });
    }

    const orderAmount = Number(amount) || 0;
    if (orderAmount > 0 && orderAmount < promo.minOrderAmount) {
      return res.status(400).json({
        success: false,
        valid: false,
        message: `Promo code "${code}" requires a minimum acquisition of $${promo.minOrderAmount.toLocaleString()}.`
      });
    }

    let calculatedDiscount = 0;
    if (orderAmount > 0) {
      if (promo.discountType === 'percentage') {
        calculatedDiscount = Math.round((orderAmount * (promo.discountValue / 100)) * 100) / 100;
      } else if (promo.discountType === 'fixed') {
        calculatedDiscount = Math.min(promo.discountValue, orderAmount);
      }
    }

    res.json({
      success: true,
      valid: true,
      data: {
        code: promo.code,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        minOrderAmount: promo.minOrderAmount,
        calculatedDiscount
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPromotions = (req, res) => {
  try {
    const promotions = db.getAllPromotions();
    res.json({ success: true, count: promotions.length, data: promotions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
