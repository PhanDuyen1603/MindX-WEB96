import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
}, {
    collection: "customers",
}
);

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;