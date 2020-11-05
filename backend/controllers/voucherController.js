import asyncHandler from 'express-async-handler'; //asyncHandler function is to make sure catch all the error
import Voucher from '../models/voucherModel.js';

// @desc Fetch all vouchers or query by promoCode
// @route GET /api/voucher
// @access Public
const getVouchers = asyncHandler(async (req, res) => {
  const promoCode = req.query.promoCode;
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  if (promoCode) {
    const voucher = await Voucher.findOne({ promoCode });
    if (voucher) {
      res.json({ voucher });
    } else {
      res.status(404);
      throw new Error('Voucher not Found');
    }
  } else {
    const count = await Voucher.countDocuments();
    const vouchers = await Voucher.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ vouchers, page, pages: Math.ceil(count / pageSize) });
  }
});

// @desc Fetch single voucher
// @route GET /api/vouchers/:id
// @access Public
const getVoucherById = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);
  if (voucher) {
    res.json(voucher);
  } else {
    res.status(404);
    throw new Error('Voucher not found');
  }
});

// @desc Create a voucher
// @route POST /api/vouchers
// @access Private/Admin
const createVoucher = asyncHandler(async (req, res) => {
  const voucher = new Voucher({
    name: 'Sample Voucher',
    discountRate: 1,
    promoCode: 'Sample code',
    minSpend: 0,
    limitUsed: 0,
  });

  const createdVoucher = await voucher.save();
  res.status(201).json(createdVoucher);
});

// @desc Delete voucher
// @route DELETE /api/vouchers/:id
// @access Private/Admin
const deleteVoucher = asyncHandler(async (req, res) => {
  const voucher = await Voucher.findById(req.params.id);
  if (voucher) {
    await voucher.remove();
    res.json({ message: 'Voucher removed' });
  } else {
    res.status(404);
    throw new Error('Voucher not found');
  }
});

// @desc Update a voucher
// @route PUT /api/vouchers/:id
// @access Private/Admin
const updateVoucher = asyncHandler(async (req, res) => {
  const { name, discountRate, promoCode, minSpend, limitUsed } = req.body;

  const voucher = await Voucher.findById(req.params.id);

  if (voucher) {
    voucher.name = name || voucher.name;
    voucher.discountRate = discountRate || voucher.discountRate;
    voucher.promoCode = promoCode || voucher.promoCode;
    voucher.minSpend = minSpend || voucher.minSpend;
    voucher.limitUsed = limitUsed || voucher.limitUsed;
    const updatedVoucher = await voucher.save();
    res.json(updatedVoucher);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getVouchers,
  getVoucherById,
  createVoucher,
  deleteVoucher,
  updateVoucher,
};
