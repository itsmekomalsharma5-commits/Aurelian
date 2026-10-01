import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  getCategories,
  getCategoryById
} from '../controllers/productController.js';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);

router.get('/categories', getCategories);
router.get('/categories/:id', getCategoryById);

export default router;
