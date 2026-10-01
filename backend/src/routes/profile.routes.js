import { Router } from 'express';
import { getProfile, getTestimonials } from '../controllers/profileController.js';

const router = Router();

router.get('/profile', getProfile);
router.get('/testimonials', getTestimonials);

export default router;
