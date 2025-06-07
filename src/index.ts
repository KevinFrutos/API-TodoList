import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './infrastructure/routes/authRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Connection error:', error);
    }
};

startServer();