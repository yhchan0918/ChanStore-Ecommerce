import express from 'express';
import { protect, adminProtect } from '../middleware/authMiddleware.js';
import {
  getProducts,
  getProductById,
  getTopProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from '../controllers/productController.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, adminProtect, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/top').get(getTopProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, adminProtect, deleteProduct)
  .put(protect, adminProtect, updateProduct);

export default router;
