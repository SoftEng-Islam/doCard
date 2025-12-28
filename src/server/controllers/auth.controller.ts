import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/User.ts';
import { AuthRequest } from '../middleware/auth.middleware.ts';

// Generate JWT token
const generateToken = (userId: string, email: string, username: string): string => {
	const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this';
	return jwt.sign({ id: userId, email, username }, jwtSecret, {
		expiresIn: '7d', // Token expires in 7 days
	});
};

/**
 * @desc   Register New User
 * @route  POST /api/auth/register
 * @access Public
 */
export const authRegister = asyncHandler(async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	// Validate input
	if (!username || !email || !password) {
		res.status(400).json({
			success: false,
			message: 'Please provide username, email, and password',
		});
		return;
	}

	// Check if user already exists
	const existingUser = await User.findOne({ email: email.toLowerCase() });
	if (existingUser) {
		res.status(400).json({
			success: false,
			message: 'User with this email already exists',
		});
		return;
	}

	// Create new user
	const user = await User.create({
		username,
		email: email.toLowerCase(),
		password,
	});

	// Generate token
	const token = generateToken(user._id.toString(), user.email, user.username);

	// Return user data (without password) and token
	res.status(201).json({
		success: true,
		data: {
			token,
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		},
		message: 'User registered successfully',
	});
});

/**
 * @desc   Login an existing User
 * @route  POST /api/auth/login
 * @access Public
 */
export const authLogin = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	// Validate input
	if (!email || !password) {
		res.status(400).json({
			success: false,
			message: 'Please provide email and password',
		});
		return;
	}

	// Find user by email
	const user = await User.findOne({ email: email.toLowerCase() });
	if (!user) {
		res.status(401).json({
			success: false,
			message: 'Invalid email or password',
		});
		return;
	}

	// Check password
	const isPasswordValid = await user.comparePassword(password);
	if (!isPasswordValid) {
		res.status(401).json({
			success: false,
			message: 'Invalid email or password',
		});
		return;
	}

	// Generate token
	const token = generateToken(user._id.toString(), user.email, user.username);

	// Return user data and token
	res.status(200).json({
		success: true,
		data: {
			token,
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		},
		message: 'Login successful',
	});
});

/**
 * @desc   Get current user
 * @route  GET /api/auth/me
 * @access Private
 */
export const authMe = asyncHandler(async (req: AuthRequest, res: Response) => {
	if (!req.user) {
		res.status(401).json({
			success: false,
			message: 'Not authorized',
		});
		return;
	}

	// Find user by ID
	const user = await User.findById(req.user.id).select('-password');
	if (!user) {
		res.status(404).json({
			success: false,
			message: 'User not found',
		});
		return;
	}

	res.status(200).json({
		success: true,
		data: {
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			},
		},
	});
});
