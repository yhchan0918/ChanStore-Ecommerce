import asyncHandler from 'express-async-handler'; //asyncHandler function is to make sure catch all the error
import Order from '../models/orderModel.js';

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    voucher,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    voucher,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

//mongoose populate() does this
// it will take the value for 'user' which is objectId to find
//then it will go to User collection
//then find the needed information in second argument in that specific User document
//then populate inside 'user' object
const getOrderbyId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user', //argument from the Order model schema
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

// @desc Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

// @desc Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDeliver = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user._id });

  res.json(order);
});

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin

const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({}).populate('user', 'id name');

  res.json(order);
});

export {
  addOrderItems,
  getOrderbyId,
  updateOrderToPaid,
  updateOrderToDeliver,
  getMyOrders,
  getAllOrders,
};
