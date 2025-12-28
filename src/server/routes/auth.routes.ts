import { Router } from 'express';

// Controllers
import { authRegister, authLogin, authMe } from '../controllers/auth.controller.ts';
import { authMiddleware } from '../middleware/auth.middleware.ts';

const router = Router();

// Public routes
// /api/auth/register
router.post('/auth/register', authRegister);

// /api/auth/login
router.post('/auth/login', authLogin);

// Protected routes
// /api/auth/me
router.get('/auth/me', authMiddleware, authMe);

export default router;
