import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getMyProfile, createMyProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/me', authenticate, getMyProfile);
router.post('/me', authenticate, createMyProfile);

export default router;
