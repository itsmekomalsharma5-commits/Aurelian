import { db } from '../services/db.js';

export const subscribeNewsletter = (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    const result = db.addSubscriber(email, source || 'web_newsletter');

    if (result.alreadySubscribed) {
      return res.json({
        success: true,
        alreadySubscribed: true,
        message: `Welcome back to the Inner Circle. Private invitations continue to be dispatched to ${result.email}.`
      });
    }

    res.status(201).json({
      success: true,
      alreadySubscribed: false,
      message: `Welcome to the Inner Circle. A private invitation with privileged access has been dispatched to ${result.email}.`
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubscribers = (req, res) => {
  try {
    const subscribers = db.getSubscribers();
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
