import mongoose from 'mongoose';

const voucherSchema = mongoose.Schema(
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
    },
    numOfUsed: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
