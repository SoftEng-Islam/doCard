import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ruruHTML } from 'ruru/server';
import { typeDefs } from './typeDefs.ts';
import { resolvers } from './resolvers.ts';
import jwt from 'jsonwebtoken';
import type { Express } from 'express';
import cors from 'cors';
import express from 'express';

export const setupGraphQL = async (app: Express) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  const getContext = async ({ req }: { req: any }) => {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
        return { user: decoded };
      } catch (err) {
        return {};
      }
    }
    return {};
  };

  // GraphQL endpoint with Apollo Server 4
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: getContext,
    }) as any
  );

  // Ruru GraphQL IDE
  app.get('/ruru', (_req, res) => {
    res.type('html');
    res.send(ruruHTML({ endpoint: '/graphql' }));
  });

  console.log('Apollo Server 4 and Ruru IDE initialized');
};
