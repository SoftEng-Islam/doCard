import express from 'express';
import ViteExpress from 'vite-express';

import "dotenv/config";


import app from './app.ts';
import { connectDB } from './config/db.ts';

const PORT = process.env.PORT || 3000;
console.log('Starting server...');
console.log(`Port: ${PORT}`);

await connectDB();

import { createApolloServer } from './graphql/index.ts';
const server = await createApolloServer();
server.applyMiddleware({ app: app as any });

ViteExpress.listen(app, 3000, () => console.log(`Server running on http://localhost:${PORT}`));
