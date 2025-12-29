import express from 'express';
import ViteExpress from 'vite-express';

import "dotenv/config";


import app from './app.ts';
import { connectDB } from './config/db.ts';

const PORT = process.env.PORT || 3000;
console.log('Starting server...');
console.log(`Port: ${PORT}`);

await connectDB();

import { setupGraphQL } from './graphql/index.ts';
await setupGraphQL(app as any);

app.get('/api/ping', (req, res) => res.send('pong'));

ViteExpress.listen(app, PORT as number, () => console.log(`Server running on http://localhost:${PORT}`));
