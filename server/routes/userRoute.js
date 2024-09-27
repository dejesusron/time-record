import express from 'express';
import {
  getUsers,
  addUser,
  loginUser,
  getUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.post('/', addUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);
router.get('/me', protect, getUser);

export default router;
