import { Router } from 'express';
import { getCustomers, getCustomerById, getOrdersByCustomerId } from '../controllers/customerController.js';

const router = Router();

router.get('/', getCustomers);

// Route cụ thể trước /:id — GET /customers/:customerId/orders
router.get('/:customerId/orders', getOrdersByCustomerId);

router.get('/:id', getCustomerById);

export default router;