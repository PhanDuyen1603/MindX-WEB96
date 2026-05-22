import { Router } from 'express';
import {
    getCustomers,
    getCustomerById,
    getOrdersByCustomerId,
    verifyApiKey,
    createApiKey,
} from '../controllers/customerController.js';

const router = Router();

// Public — tạo/lấy apiKey (không cần ?apiKey=)
router.get('/getApikey/:id', createApiKey);

// Protected — bắt buộc ?apiKey=...
router.get('/', verifyApiKey, getCustomers);
router.get('/:customerId/orders', verifyApiKey, getOrdersByCustomerId);
router.get('/:id', verifyApiKey, getCustomerById);

export default router;
