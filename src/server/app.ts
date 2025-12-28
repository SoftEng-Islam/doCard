import express from 'express';
// import cors from 'cors';
import authRoutes from './routes/auth.routes.ts';
import cardsRoutes from './routes/cards.routes.ts';
import { errorHandler } from './middleware/error.ts';

const app = express();

// app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/cards', cardsRoutes);

app.use(errorHandler);

export default app;
