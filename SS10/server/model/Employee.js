import mongoose from 'mongoose';
const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Manager', required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true, unique: true },
}, {
    collection: 'employees',
});
const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;