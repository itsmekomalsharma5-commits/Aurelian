import { Router } from 'express';
import { getCart, updateCart, clearCart } from '../controllers/cartController.js';

const router = Router();

router.get('/cart/:sessionId', getCart);
router.post('/cart/:sessionId', updateCart);
router.put('/cart/:sessionId', updateCart);
router.delete('/cart/:sessionId', clearCart);

export default router;
