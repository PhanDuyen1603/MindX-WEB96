import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createEmployee } from '../controllers/managerController.js';

const router = express.Router();

router.post('/employees', authenticate, authorize('MANAGER'), createEmployee);

export default router;
