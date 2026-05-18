import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    customerId: { type: String, required: true }, // khớp id khách: "c002", "1"...
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
}, {
    collection: 'orders',
});

const Order = mongoose.model('Order', orderSchema);
export default Order;