import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { authenticate } from '../middlewares/authMiddleware';
import { isAdmin } from '../middlewares/authMiddleware';

const router = Router();
const orderController = new OrderController();

router.use(authenticate); 

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderDetails);
router.patch('/:id/cancel', orderController.cancelOrder);

// Rota Admin
router.get('/admin/all', authenticate, isAdmin, orderController.getAllOrders);

export default router;