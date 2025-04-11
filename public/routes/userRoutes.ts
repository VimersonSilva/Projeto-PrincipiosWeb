import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.delete);

router.get('/ping', (req, res) => {
    res.send('pong');
  });
  

export default router;