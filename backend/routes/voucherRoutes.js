import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import {
  createVoucher,
  deleteVoucher,
  getVoucherById,
  getVouchers,
  updateVoucher,
} from '../controllers/voucherController.js';

const router = express.Router();

router.route('/').get(getVouchers).post(protect, adminProtect, createVoucher);
router
  .route('/:id')
  .get(getVoucherById)
  .delete(protect, adminProtect, deleteVoucher)
  .put(protect, adminProtect, updateVoucher);

export default router;
