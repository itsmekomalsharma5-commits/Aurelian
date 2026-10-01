import { Router } from 'express';
import { validatePromo, getPromotions } from '../controllers/promoController.js';

const router = Router();

router.get('/promos/validate', validatePromo);
router.get('/promos', getPromotions);

export default router;
