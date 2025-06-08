import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './infrastructure/routes/authRoutes';
import noteRoutes from "./infrastructure/routes/noteRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/note', noteRoutes);

export default app;
