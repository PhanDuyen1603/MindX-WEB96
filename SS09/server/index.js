import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();
app.use(express.json());


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