import express from "express";
import { signup, login,changePassword ,logout} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/changepassword', protect, changePassword);
router.get('/logout', logout);

export default router;
