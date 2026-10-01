import { db } from '../services/db.js';

export const getProfile = (req, res) => {
  try {
    const profile = db.getProfile();
    const orders = db.getOrders();
    const consultations = db.getConsultations();

    res.json({
      success: true,
      data: {
        ...profile,
        recentOrders: orders.slice(0, 3),
        upcomingConsultations: consultations.slice(0, 2)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getTestimonials = (req, res) => {
  try {
    const testimonials = db.getTestimonials();
    res.json({ success: true, count: testimonials.length, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
