import { Router } from 'express';
import { CartController } from '../controllers/cartController';
import { authenticate } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validate';
import { cartItemSchema } from '../validators/cartValidator.ts';

const router = Router();
const cartController = new CartController();

router.use(authenticate); // Todas as rotas exigem autenticação

router.get('/', cartController.getCart);
router.post('/items', validate(cartItemSchema), cartController.addItem);
router.put('/items/:productId', validate(cartItemSchema), cartController.updateItem);
router.delete('/items/:productId', cartController.removeItem);
router.delete('/clear', cartController.clearCart);

export default router;