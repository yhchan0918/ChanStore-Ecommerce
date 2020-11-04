import mongoose from 'mongoose';

const CouponSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    discountRate: {
      type: Number,
      required: true,
      default: 0,
    },
    promoCode: {
      type: String,
      required: true,
    },
    minSpend: {
      type: Number,
    },
    limitUsed: {
      type: Number,
      required: true,
      default: 0,
    },
    numOfUsed: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model('Coupon', CouponSchema);

export default Coupon;
