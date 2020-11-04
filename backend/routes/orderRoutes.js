import express from 'express';
import {
  addOrderItems,
  getOrderbyId,
  updateOrderToPaid,
  updateOrderToDeliver,
  getMyOrders,
  getAllOrders,
} from '../controllers/orderController.js';
import { adminProtect, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, adminProtect, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderbyId);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, adminProtect, updateOrderToDeliver);

export default router;
