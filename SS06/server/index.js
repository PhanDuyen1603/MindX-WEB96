import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Customer from './model/Customer.js';
import customerRouter from './routers/customerRouter.js';

import express from 'express';
import crypto from 'crypto';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/customers', customerRouter);


const PORT = process.env.PORT || 8080;

app.post('/customers', async (req, res) => {
    try{
        const { name, email, age } = req.body;
        const customer = await Customer.create({ id: crypto.randomUUID(), name, email, age });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo khách hàng' });
    }
});








// app.listen(PORT, () => {
//     console.log(`Server is running`);
// });



async function startServer() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ Đã kết nối MongoDB");
      app.listen(PORT, () => {
        console.log(`🚀 Server: http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("❌ Lỗi MongoDB:", error.message);
      process.exit(1);
    }
  }
  startServer();