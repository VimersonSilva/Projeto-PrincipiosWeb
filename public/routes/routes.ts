import { Router } from 'express';
import authRoutes from '../routes/authRoutes';
import productRoutes from '../routes/productRoutes';
import cartRoutes from '../routes/cartRoutes';
import orderRoutes from '../routes/orderRoutes';
import userRoutes from '../routes/userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

export default router;