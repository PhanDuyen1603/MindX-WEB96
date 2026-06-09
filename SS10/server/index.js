import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import authRouter from './routers/authRouter.js';
import profileRouter from './routers/profileRouter.js';
import managerRouter from './routers/managerRouter.js';
import propertyRouter from './routers/propertyRouter.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/managers', managerRouter);
app.use('/api/properties', propertyRouter);

const PORT = process.env.PORT || 8080;

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
