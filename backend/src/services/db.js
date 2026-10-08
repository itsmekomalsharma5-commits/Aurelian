import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { config } from '../config/index.js';
import { INITIAL_DATA } from '../data/initialData.js';

const JWT_SECRET = config.jwtSecret || 'aurelian_imperial_high_jewelry_secret_2026';

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

function verifyPassword(password, salt, hash) {
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return checkHash === hash;
}

export function generateAuthToken(userId) {
  const payload = Buffer.from(
    JSON.stringify({ userId, exp: Date.now() + 14 * 86400000 })
  ).toString('base64url');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(payload)
    .digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyAuthToken(token) {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [payload, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(payload)
      .digest('base64url');
    if (signature !== expectedSig) return null;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

class DataStore {
  constructor() {
    this.filePath = config.dbFilePath;
    this.data = null;
    this.init();
  }

  init() {
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        this.data = JSON.parse(fileContent);
      } else {
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      }

      // Ensure users collection exists with demo account
      if (!this.data.users || this.data.users.length === 0) {
        const demoCreds = hashPassword('AurelianVIP2026!');
        this.data.users = [
          {
            id: 'usr_eleanor_001',
            firstName: 'Eleanor',
            lastName: 'Vance',
            email: 'eleanor@aurelian-maison.com',
            phone: '+1 212 555 4321',
            passwordHash: demoCreds.hash,
            passwordSalt: demoCreds.salt,
            tier: 'Imperial Sovereign Member',
            tierColor: '#e9c349',
            loyaltyPoints: 14850,
            preferredBoutique: 'Aurelian Salon Fifth Avenue',
            address: '740 Park Avenue, Penthouse B',
            city: 'New York',
            country: 'United States',
            postalCode: '10021',
            createdAt: '2025-01-10T10:00:00.000Z',
          },
        ];
      }

      this.save();
    } catch (err) {
      console.error('Error initializing DataStore, falling back to INITIAL_DATA:', err.message);
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      try {
        this.save();
      } catch (saveErr) {
        console.error('Error saving initial data to disk:', saveErr.message);
      }
    }
  }

  save() {
    try {
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempPath, this.filePath);
    } catch (err) {
      try {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
      } catch (writeErr) {
        console.warn('DataStore write skipped (filesystem may be ephemeral or read-only):', writeErr.message);
      }
    }
  }

  // --- USERS & AUTHENTICATION ---
  findUserByEmail(email) {
    if (!email || !this.data.users) return null;
    const cleanEmail = email.trim().toLowerCase();
    return this.data.users.find((u) => u.email.toLowerCase() === cleanEmail) || null;
  }

  getUserById(id) {
    if (!id || !this.data.users) return null;
    const user = this.data.users.find((u) => u.id === id);
    if (!user) return null;
    const { passwordHash, passwordSalt, ...safeUser } = user;
    return safeUser;
  }

  createUser({ firstName, lastName, email, password, phone, boutiqueId }) {
    const cleanEmail = email.trim().toLowerCase();
    const existing = this.findUserByEmail(cleanEmail);
    if (existing) {
      throw new Error('An Aurelian VIP account is already registered with this email address.');
    }

    const { salt, hash } = hashPassword(password);
    const userId = `usr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    const boutiques = this.getBoutiques();
    const selectedBoutique = boutiques.find((b) => b.id === boutiqueId) || boutiques[0];

    const newUser = {
      id: userId,
      firstName: firstName.trim(),
      lastName: (lastName || '').trim(),
      email: cleanEmail,
      phone: (phone || '').trim(),
      passwordHash: hash,
      passwordSalt: salt,
      tier: 'Privileged Salon Patron',
      tierColor: '#e6b5f6',
      loyaltyPoints: 500, // 500 welcome bonus points
      preferredBoutique: selectedBoutique.name,
      address: '',
      city: '',
      country: 'United States',
      postalCode: '',
      createdAt: new Date().toISOString(),
    };

    if (!this.data.users) this.data.users = [];
    this.data.users.push(newUser);
    this.save();

    const { passwordHash, passwordSalt, ...safeUser } = newUser;
    return safeUser;
  }

  verifyUserCredentials(email, password) {
    const user = this.findUserByEmail(email);
    if (!user) return null;
    const isValid = verifyPassword(password, user.passwordSalt, user.passwordHash);
    if (!isValid) return null;
    const { passwordHash, passwordSalt, ...safeUser } = user;
    return safeUser;
  }

  // --- PRODUCTS ---
  getProducts(filters = {}) {
    let list = [...this.data.products];

    if (filters.category) {
      const catLower = filters.category.toLowerCase();
      list = list.filter(
        (p) =>
          p.categorySlug === catLower ||
          p.category.toLowerCase() === catLower
      );
    }

    if (filters.type === 'new-arrivals') {
      list = list.filter((p) => p.isNewArrival);
    } else if (filters.type === 'best-sellers') {
      list = list.filter((p) => p.isBestSeller);
    } else if (filters.type === 'featured') {
      list = list.filter((p) => p.featured);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.gemstone.toLowerCase().includes(q) ||
          p.metal.toLowerCase().includes(q)
      );
    }

    if (filters.minPrice !== undefined && !isNaN(filters.minPrice)) {
      list = list.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice !== undefined && !isNaN(filters.maxPrice)) {
      list = list.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.sort) {
      if (filters.sort === 'price-asc') {
        list.sort((a, b) => a.price - b.price);
      } else if (filters.sort === 'price-desc') {
        list.sort((a, b) => b.price - a.price);
      } else if (filters.sort === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      } else if (filters.sort === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return list;
  }

  getProductById(id) {
    return this.data.products.find((p) => p.id === id || p.sku === id) || null;
  }

  createProduct(productData) {
    const newProduct = {
      id: productData.id || `aur-custom-${Date.now()}`,
      sku: productData.sku || `AUR-CST-${Date.now().toString().slice(-4)}`,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      stockCount: 10,
      ...productData,
      createdAt: new Date().toISOString(),
    };
    this.data.products.push(newProduct);
    this.save();
    return newProduct;
  }

  // --- CATEGORIES ---
  getCategories() {
    return this.data.categories;
  }

  getCategoryById(id) {
    return (
      this.data.categories.find(
        (c) => c.id === id || c.slug === id.toLowerCase()
      ) || null
    );
  }

  // --- PROMOTIONS ---
  getPromotion(code) {
    if (!code) return null;
    const cleanCode = code.trim().toUpperCase();
    return (
      this.data.promotions.find(
        (p) => p.code.toUpperCase() === cleanCode && p.active
      ) || null
    );
  }

  getAllPromotions() {
    return this.data.promotions.filter((p) => p.active);
  }

  // --- CARTS ---
  getCart(sessionId) {
    if (!this.data.carts[sessionId]) {
      this.data.carts[sessionId] = {
        sessionId,
        items: [],
        appliedPromo: null,
        updatedAt: new Date().toISOString(),
      };
      this.save();
    }
    return this.data.carts[sessionId];
  }

  saveCart(sessionId, cartData) {
    this.data.carts[sessionId] = {
      ...cartData,
      sessionId,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.data.carts[sessionId];
  }

  clearCart(sessionId) {
    if (this.data.carts[sessionId]) {
      this.data.carts[sessionId] = {
        sessionId,
        items: [],
        appliedPromo: null,
        updatedAt: new Date().toISOString(),
      };
      this.save();
    }
    return { success: true };
  }

  // --- ORDERS ---
  getOrders(userEmail = null) {
    if (!userEmail) return this.data.orders;
    const cleanEmail = userEmail.trim().toLowerCase();
    return this.data.orders.filter(
      (o) => o.customer && o.customer.email.toLowerCase() === cleanEmail
    );
  }

  getOrderById(id) {
    return (
      this.data.orders.find(
        (o) => o.id === id || o.orderNumber === id || o.trackingNumber === id
      ) || null
    );
  }

  createOrder(orderData) {
    const orderNumber = `AUR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `AUR-EXP-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderNumber,
      orderNumber,
      status: 'CONFIRMED',
      trackingNumber,
      createdAt: new Date().toISOString(),
      ...orderData,
    };

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  // --- CONSULTATIONS ---
  getConsultations(userEmail = null) {
    if (!userEmail) return this.data.consultations;
    const cleanEmail = userEmail.trim().toLowerCase();
    return this.data.consultations.filter(
      (c) => c.email && c.email.toLowerCase() === cleanEmail
    );
  }

  createConsultation(consultationData) {
    const newConsultation = {
      id: `cst-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      ...consultationData,
    };
    this.data.consultations.unshift(newConsultation);
    this.save();
    return newConsultation;
  }

  getBoutiques() {
    return this.data.boutiques;
  }

  // --- NEWSLETTER / SUBSCRIBERS ---
  getSubscribers() {
    return this.data.subscribers;
  }

  addSubscriber(email, source = 'web') {
    const cleanEmail = email.trim().toLowerCase();
    const exists = this.data.subscribers.some((s) => s.email === cleanEmail);
    if (exists) {
      return { email: cleanEmail, alreadySubscribed: true };
    }

    const subscriber = {
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      source,
    };
    this.data.subscribers.push(subscriber);
    this.save();
    return { email: cleanEmail, alreadySubscribed: false };
  }

  // --- VIP PROFILE ---
  getProfile() {
    return this.data.profile;
  }

  getTestimonials() {
    return this.data.testimonials;
  }
}

export const db = new DataStore();
