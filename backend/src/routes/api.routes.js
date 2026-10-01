import { Router } from 'express';
import productsRoutes from './products.routes.js';
import cartRoutes from './cart.routes.js';
import ordersRoutes from './orders.routes.js';
import promosRoutes from './promos.routes.js';
import consultationsRoutes from './consultations.routes.js';
import newsletterRoutes from './newsletter.routes.js';
import profileRoutes from './profile.routes.js';
import authRoutes from './auth.routes.js';

const router = Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Aurelian Luxury High Jewelry API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// API Directory
router.get('/', (req, res) => {
  res.json({
    name: 'Aurelian High Jewelry RESTful API',
    version: '1.0.0',
    description: 'Backend services for the Aurelian Luxury Jewelry Maison',
    endpoints: {
      health: 'GET /api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        logout: 'POST /api/auth/logout',
      },
      products: {
        list: 'GET /api/products (filters: category, type, search, minPrice, maxPrice, sort)',
        single: 'GET /api/products/:id',
        create: 'POST /api/products',
      },
      categories: {
        list: 'GET /api/categories',
        single: 'GET /api/categories/:id',
      },
      cart: {
        get: 'GET /api/cart/:sessionId',
        update: 'POST /api/cart/:sessionId',
        clear: 'DELETE /api/cart/:sessionId',
      },
      orders: {
        create: 'POST /api/orders',
        get: 'GET /api/orders/:id',
        list: 'GET /api/orders',
      },
      promotions: {
        validate: 'GET /api/promos/validate?code=XYZ&amount=1000',
        list: 'GET /api/promos',
      },
      consultations: {
        boutiques: 'GET /api/boutiques',
        book: 'POST /api/consultations',
        list: 'GET /api/consultations',
      },
      newsletter: {
        subscribe: 'POST /api/newsletter/subscribe',
        subscribers: 'GET /api/newsletter/subscribers',
      },
      profile: {
        vip: 'GET /api/profile',
        testimonials: 'GET /api/testimonials',
      },
    },
  });
});

// Mount Sub-routes
router.use('/auth', authRoutes);
router.use('/', productsRoutes);
router.use('/', cartRoutes);
router.use('/', ordersRoutes);
router.use('/', promosRoutes);
router.use('/', consultationsRoutes);
router.use('/', newsletterRoutes);
router.use('/', profileRoutes);

export default router;
