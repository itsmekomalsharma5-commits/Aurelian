import { Router } from 'express';
import {
  getBoutiques,
  getConsultations,
  createConsultation
} from '../controllers/consultationController.js';

const router = Router();

router.get('/boutiques', getBoutiques);
router.get('/consultations', getConsultations);
router.post('/consultations', createConsultation);

export default router;
