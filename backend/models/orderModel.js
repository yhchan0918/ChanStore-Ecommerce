import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Voucher',
    },
  },
  {
    timestamps: true,
  }
);

// Static method to get Numer of times the voucher used
orderSchema.statics.getNumofUsed = async function (voucherId) {
  const docs = await this.aggregate([
    {
      $match: { voucher: voucherId },
    },
    {
      $group: {
        _id: '$voucher',
        numOfUsed: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model('Voucher').findByIdAndUpdate(voucherId, {
      numOfUsed,
    });
  } catch (error) {
    console.error(error);
  }
};

// Call getNumofUsed after save
orderSchema.post('save', function () {
  this.constructor.getNumofUsed(this.voucher);
});

// Call getNumofUsed before remove
orderSchema.pre('remove', function () {
  this.constructor.getNumofUsed(this.voucher);
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
