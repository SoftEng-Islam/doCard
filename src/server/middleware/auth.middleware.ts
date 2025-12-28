import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
	user?: {
		id: string;
		email: string;
		username: string;
	};
}

export const authMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		// Get token from header
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({
				success: false,
				message: 'No token provided, authorization denied',
			});
		}

		const token = authHeader.substring(7); // Remove 'Bearer ' prefix

		// Verify token
		const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this';
		const decoded = jwt.verify(token, jwtSecret) as {
			id: string;
			email: string;
			username: string;
		};

		// Attach user to request
		req.user = decoded;

		next();
	} catch (error) {
		console.error('Auth middleware error:', error);
		return res.status(401).json({
			success: false,
			message: 'Token is invalid or expired',
		});
	}
};
