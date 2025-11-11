import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Graceful shutdown
process.on('uncaughtException', (err, origin) => {
  console.error(`UNCAUGHT EXCEPTION! 💥 Origin: ${origin}, Error: ${err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! 💥 Reason:', reason);
  // Application specific logging, throwing an error, or other logic here
  process.exit(1);
});

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running..."));

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

console.log(`[INFO] NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`[INFO] MONGO_URI loaded: ${!!process.env.MONGO_URI}`);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB, server not started.', error);
    process.exit(1);
  }
};

startServer();