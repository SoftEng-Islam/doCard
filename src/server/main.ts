import express from 'express';
import ViteExpress from 'vite-express';

import dotenv from 'dotenv';
dotenv.config();

import app from './app.ts';
import { connectDB } from './config/db.ts';

const PORT = process.env.PORT || 3000;
console.log('Starting server...');
console.log(`Port: ${PORT}`);

await connectDB();

ViteExpress.listen(app, 3000, () => console.log(`Server running on http://localhost:${PORT}`));
