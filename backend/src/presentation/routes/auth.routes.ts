import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validation.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { authLimiter } from '../middleware/rate-limit.middleware';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/auth.validator';

const router = Router();
const authController = new AuthController();

// Apply rate limiting to all auth routes
router.use(authLimiter);

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.get('/profile', authController.getProfile);
router.put('/profile', validate(updateProfileSchema), authController.updateProfile);
router.post('/change-password', authController.changePassword);
router.post('/logout', authController.logout);
router.delete('/account', authController.deleteAccount);

// Admin only routes
router.get('/users', authorize(['ADMIN', 'SUPER_ADMIN']), authController.getAllUsers);
router.get('/users/:id', authorize(['ADMIN', 'SUPER_ADMIN']), authController.getUserById);
router.put('/users/:id/status', authorize(['ADMIN', 'SUPER_ADMIN']), authController.updateUserStatus);
router.delete('/users/:id', authorize(['SUPER_ADMIN']), authController.deleteUser);

export default router;