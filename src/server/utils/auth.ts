import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, email: string, username: string): string => {
	const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this';
	return jwt.sign({ id: userId, email, username }, jwtSecret, {
		expiresIn: '7d', // Token expires in 7 days
	});
};
