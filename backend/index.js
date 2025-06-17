import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import chargerRoutes from './routes/chargerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/chargers', chargerRoutes);
app.use('/api', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const createAdminUser = async () => {
  const adminUsername = "rohit@gmail.com";
  const adminPassword = "123456";
  const adminExists = await User.findOne({ username: adminUsername });
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      username: adminUsername,
      password: hashedPassword,
      isAdmin: true
    });
    console.log("Admin user created:", adminUsername);
  } else {
    console.log("Admin user already exists.");
  }
};

connectDB()
  .then(createAdminUser)
  .catch(err => console.error("Error connecting to the database:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

