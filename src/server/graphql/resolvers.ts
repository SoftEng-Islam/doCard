import User from '../models/User.ts';
import Card from '../models/Card.ts';
import { generateToken } from '../utils/auth.ts';
import { AuthenticationError, UserInputError } from 'apollo-server-express';

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
        throw new UserInputError('Please provide username, email, and password');
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        throw new UserInputError('User with this email already exists');
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
        throw new UserInputError('Please provide email and password');
      }

      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid email or password');
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
        throw new AuthenticationError('Not authorized');
      }

      if (!word || !meaning) {
        throw new UserInputError('Word and meaning are required');
      }

      return await Card.create({ word, meaning });
    },
    deleteCard: async (_: any, { id }: any, { user }: any) => {
      if (!user) {
        throw new AuthenticationError('Not authorized');
      }

      const card = await Card.findByIdAndDelete(id);
      if (!card) {
        throw new UserInputError('Card not found');
      }

      return true;
    },
  },
};
