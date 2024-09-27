import express from 'express';
import {
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} from '../controllers/recordController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getRecords);
router.post('/', protect, addRecord);
router.put('/:id', protect, updateRecord);
router.delete('/:id', protect, deleteRecord);

export default router;
