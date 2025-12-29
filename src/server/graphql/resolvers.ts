import User from '../models/User.ts';
import Card from '../models/Card.ts';
import { generateToken } from '../utils/auth.ts';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) return null;
      return await User.findById(user.id).select('-password');
    },
    getCards: async () => {
      return await Card.find().sort({ createdAt: -1 });
    },
  },
  Mutation: {
    register: async (_: any, { username, email, password }: any) => {
      // Validate input
      // ... same logic
      if (!username || !email || !password) {
        throw new GraphQLError('Please provide username, email, and password', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        throw new GraphQLError('User with this email already exists', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      // Create new user
      const user = await User.create({
        username,
        email: email.toLowerCase(),
        password,
      });

      // Generate token
      const token = generateToken(user._id.toString(), user.email, user.username);

      return {
        success: true,
        token,
        user,
        message: 'User registered successfully',
      };
    },
    login: async (_: any, { email, password }: any) => {
      // Validate input
      if (!email || !password) {
        throw new GraphQLError('Please provide email and password', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new GraphQLError('Invalid email or password', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new GraphQLError('Invalid email or password', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      // Generate token
      const token = generateToken(user._id.toString(), user.email, user.username);

      return {
        success: true,
        token,
        user,
        message: 'Login successful',
      };
    },
    createCard: async (_: any, { word, meaning }: any, { user }: any) => {
      if (!user) {
        throw new GraphQLError('Not authorized', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      if (!word || !meaning) {
        throw new GraphQLError('Word and meaning are required', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      return await Card.create({ word, meaning });
    },
    deleteCard: async (_: any, { id }: any, { user }: any) => {
      if (!user) {
        throw new GraphQLError('Not authorized', {
          extensions: { code: 'UNAUTHENTICATED' }
        });
      }

      const card = await Card.findByIdAndDelete(id);
      if (!card) {
        throw new GraphQLError('Card not found', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      return true;
    },
  },
};
