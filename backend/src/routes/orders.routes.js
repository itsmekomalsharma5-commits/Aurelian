import { Router } from 'express';
import { createOrder, getOrderById, getOrders } from '../controllers/orderController.js';

const router = Router();

router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.get('/orders/:id', getOrderById);

export default router;
