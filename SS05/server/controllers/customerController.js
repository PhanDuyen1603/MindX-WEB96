import Customer from '../model/Customer.js';
import Order from '../model/Order.js';
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