import express from 'express';
import {
  getChargers,
  createCharger,
  updateCharger,
  deleteCharger
} from '../controllers/chargerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { adminOnly } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', getChargers);
router.post('/', protect, adminOnly, createCharger);
router.put('/:id', protect, adminOnly, updateCharger);
router.delete('/:id', protect, adminOnly, deleteCharger);

export default router;