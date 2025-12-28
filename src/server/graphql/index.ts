import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs.ts';
import { resolvers } from './resolvers.ts';
import jwt from 'jsonwebtoken';

export const createApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
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
    },
  });

  await server.start();
  return server;
};
