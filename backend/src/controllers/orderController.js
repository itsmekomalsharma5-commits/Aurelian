import { db } from '../services/db.js';
import { config } from '../config/index.js';

export const createOrder = (req, res) => {
  try {
    const { customer, items, promoCode, paymentMethod, giftWrap, giftMessage } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your shopping bag is empty.' });
    }

    if (!customer || !customer.email || !customer.firstName) {
      return res.status(400).json({
        success: false,
        message: 'Customer information (firstName, email) is required.'
      });
    }

    // Verify item prices from database to prevent client tampering
    const verifiedItems = items.map((clientItem) => {
      const dbProduct = db.getProductById(clientItem.id);
      const price = dbProduct ? dbProduct.price : clientItem.price;
      const name = dbProduct ? dbProduct.name : clientItem.name;
      const image = dbProduct ? dbProduct.image : clientItem.image;
      const quantity = Math.max(1, Number(clientItem.quantity) || 1);

      return {
        id: clientItem.id,
        name,
        price,
        quantity,
        image
      };
    });

    const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Apply promo if valid
    let discountAmount = 0;
    let appliedPromoCode = null;
    if (promoCode) {
      const promo = db.getPromotion(promoCode);
      if (promo && subtotal >= promo.minOrderAmount) {
        appliedPromoCode = promo.code;
        if (promo.discountType === 'percentage') {
          discountAmount = Math.round((subtotal * (promo.discountValue / 100)) * 100) / 100;
        } else if (promo.discountType === 'fixed') {
          discountAmount = Math.min(promo.discountValue, subtotal);
        }
      }
    }

    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = Math.round((taxableAmount * config.taxRate) * 100) / 100;
    const shippingFee = config.standardShippingFee;
    const total = Math.round((taxableAmount + taxAmount + shippingFee) * 100) / 100;

    const orderData = {
      customer: {
        firstName: customer.firstName.trim(),
        lastName: customer.lastName ? customer.lastName.trim() : '',
        email: customer.email.trim(),
        phone: customer.phone ? customer.phone.trim() : '',
        address: customer.address || 'Place Vendôme Private Suite',
        city: customer.city || 'Paris',
        country: customer.country || 'France',
        postalCode: customer.postalCode || '75001'
      },
      items: verifiedItems,
      pricing: {
        subtotal,
        discountAmount,
        discountCode: appliedPromoCode,
        taxAmount,
        shippingFee,
        shippingType: 'Complimentary Insured Courier',
        total
      },
      paymentMethod: paymentMethod || 'Aurelian VIP Concierge Wire',
      giftWrap: Boolean(giftWrap),
      giftMessage: giftMessage || ''
    };

    const newOrder = db.createOrder(orderData);

    res.status(201).json({
      success: true,
      message: 'Your high-jewelry acquisition has been registered with the Maison.',
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrderById = (req, res) => {
  try {
    const { id } = req.params;
    const order = db.getOrderById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: `Order not found: ${id}` });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getOrders = (req, res) => {
  try {
    const { email } = req.query;
    const orders = db.getOrders(email);
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

