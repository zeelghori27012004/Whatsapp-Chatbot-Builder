import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import botRoutes from './routes/botRoutes.js';
// import twilioRoutes from './routes/twilioRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/bots', botRoutes);
// app.use('/api/twilio', twilioRoutes);
// app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
