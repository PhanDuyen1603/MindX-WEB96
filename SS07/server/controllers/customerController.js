import Customer from '../model/Customer.js';
import Order from '../model/Order.js';
import { generateRandomString, buildApiKey } from '../utils/apiKey.js';
export const getCustomers = async (req, res) => {
    try{
        const list = await Customer.find({}).lean();
        res.json(list);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách khách hàng' });
    }
};

export const getCustomerById = async (req, res) => {
    try{
        const { id } = req.params;
        const customer = await Customer.findOne({ id }).lean();
        if (!customer) {
            return res.status(404).json({ error: 'Khách hàng không tồn tại' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy khách hàng' });
    }
};

export const getOrdersByCustomerId = async (req, res) => {
    try{
        const { customerId } = req.params;
        const orders = await Order.find({ customerId }).lean();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy đơn hàng' });
    }
};

export const createApiKey = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findOne({ id });
        if (!customer) {
            return res.status(404).json({ error: 'Khach hang khong ton tai' });
        }
        if (customer.apiKey) {
            return res.json({ apiKey: customer.apiKey });
        }
        const randomString = generateRandomString(12);
        const apiKey = buildApiKey(customer.id, customer.email, randomString);
        customer.apiKey = apiKey;
        await customer.save();
        res.json({ apiKey });
    } catch (error) {
        res.status(500).json({ error: 'Loi khi tao apiKey' });
    }
};

export const verifyApiKey = async (req, res, next) => {
    try{
        const { apiKey } = req.query;
        if (!apiKey) {
            return res.status(401).json({ error: 'Thieu apiKey' });
        }

        const customer = await Customer.findOne({ apiKey });
        if (!customer) {
            return res.status(401).json({ error: 'ApiKey khong hop le' });
        }
        req.customer = customer;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy apiKey' });
    }
};