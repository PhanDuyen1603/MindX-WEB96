import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { createProperty, updateProperty } from '../controllers/propertyController.js';

const router = express.Router();

router.post('/', authenticate, authorize('MANAGER', 'EMPLOYEE'), createProperty);
router.put('/:id', authenticate, authorize('MANAGER', 'EMPLOYEE'), updateProperty);

export default router;
