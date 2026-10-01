import { db, generateAuthToken, verifyAuthToken } from '../services/db.js';

export const register = (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, boutiqueId } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, email address, and a secure password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters in length.',
      });
    }

    const user = db.createUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      boutiqueId,
    });

    const token = generateAuthToken(user.id);

    res.status(201).json({
      success: true,
      message: `Welcome to the Maison Aurelian, ${user.firstName}. Your VIP client account is active.`,
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your registered email address and password.',
      });
    }

    const user = db.verifyUserCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify your Maison credentials.',
      });
    }

    const token = generateAuthToken(user.id);

    res.json({
      success: true,
      message: `Welcome back, ${user.firstName}.`,
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMe = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token required.',
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAuthToken(token);
    if (!payload || !payload.userId) {
      return res.status(401).json({
        success: false,
        message: 'Session has expired or token is invalid. Please sign in again.',
      });
    }

    const user = db.getUserById(payload.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    const userOrders = db.getOrders(user.email);
    const userConsultations = db.getConsultations(user.email);

    res.json({
      success: true,
      data: {
        ...user,
        recentOrders: userOrders.slice(0, 5),
        upcomingConsultations: userConsultations.slice(0, 3),
        dedicatedConcierge: {
          name: 'Henri de Montmirail',
          title: 'Senior High Jewelry Liaison',
          email: 'concierge@aurelian-maison.com',
          phone: '+33 1 42 68 00 12',
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const logout = (req, res) => {
  res.json({
    success: true,
    message: 'You have been securely signed out of the Maison Aurelian portal.',
  });
};
