import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './db/db.js'

import userRoutes from './routes/user.routes.js';
// import projectRoutes from './routes/project.routes.js';
// import twilioRoutes from './routes/twilioRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';
connectDB();

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/users', userRoutes);
// app.use('/projects', projectRoutes);
// app.use('/api/twilio', twilioRoutes);
// app.use('/api/admin', adminRoutes);

export default app;
