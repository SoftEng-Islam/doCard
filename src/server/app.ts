import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/auth.routes.ts';
// import cardsRoutes from './routes/cards.routes.ts';
import { errorHandler } from './middleware/error.ts';

const app = express();

// app.use(cors());
// Middleware will be added in main.ts to control order

// Routes - Replaced by GraphQL
// app.use('/api', authRoutes);
// app.use('/api/cards', cardsRoutes);

app.get('/ping', (req, res) => res.send('pong'));

app.use(errorHandler);

export default app;
