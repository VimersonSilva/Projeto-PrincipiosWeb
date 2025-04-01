import express, { NextFunction } from 'express';
import { validate } from '../middlewares/validate';
import { loginSchema} from  '../validators/authValidator';
import {registerSchema } from '../validators/authValidator';
import { authenticate } from '../middlewares/authMiddleware';
import { authController } from '../controllers/authController';


const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);
router.get('/me', authenticate, authController.getCurrentUser);
router.post('/logout', authenticate, authController.logout);


export default router;