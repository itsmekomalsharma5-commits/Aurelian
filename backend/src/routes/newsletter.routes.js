import { Router } from 'express';
import { subscribeNewsletter, getSubscribers } from '../controllers/newsletterController.js';

const router = Router();

router.post('/newsletter/subscribe', subscribeNewsletter);
router.get('/newsletter/subscribers', getSubscribers);

export default router;
