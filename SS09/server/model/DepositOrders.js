import mongoose from 'mongoose';
const depositOrderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
    depositAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Đã thanh toán', 'Chờ xử lý', 'Đã huỷ'], default: 'Chờ xử lý' },
}, {
    collection: 'depositorders',
});
const DepositOrder = mongoose.model('DepositOrder', depositOrderSchema);
export default DepositOrder;