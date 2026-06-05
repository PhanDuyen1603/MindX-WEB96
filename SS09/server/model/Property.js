import mongoose from 'mongoose';
const propertySchema = new mongoose.Schema({
    address: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    status: { type: String, enum: ['Đang bán', 'Đã bán', 'Dừng bán'], default: 'Đang bán' },
    images: { type: [String], default: [] },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
}, {
    collection: 'properties',
});
const Property = mongoose.model('Property', propertySchema);
export default Property;