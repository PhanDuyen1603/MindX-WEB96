import mongoose from 'mongoose';
const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, unique: true },
}, {
    collection: 'managers',
});
const Manager = mongoose.model('Manager', managerSchema);
export default Manager;