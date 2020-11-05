import React, { useEffect, useState } from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
  Form,
  Toast,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { createOrder } from '../actions/orderActions';
import axios from 'axios';
import { ORDER_CREATE } from '../constants/orderConstants';

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState(false);
  const [voucher, setVoucher] = useState(null);

  const checkVoucher = async () => {
    try {
      const { data } = await axios.get(`/api/vouchers/?promoCode=${promoCode}`);
      const { voucher } = data;
      setToastMsg('Valid PromoCode');
      setShow(true);
      if (voucher) {
        setVoucher(voucher);
      }
    } catch (error) {
      console.log();
      setShow(true);
      setToastMsg('Invalid PromoCode');
    }
  };

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  //Calculate Prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }

    // eslint-disable-next-line
  }, [history, success]);

  if (voucher) {
    cart.totalPrice = (cart.totalPrice * (1 - voucher.discountRate)).toFixed(2);
    cart.voucher = voucher._id;
  }
  const placeOrderHandler = () => {
    dispatch({
      type: ORDER_CREATE.INITIAL,
    });
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row
        style={{
          position: 'relative',
        }}
      >
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
              </p>
              {cart.shippingAddress.address},{cart.shippingAddress.city},
              {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method</strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x RM {item.price} = RM
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>RM{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>RM{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>RM{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>RM{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Form.Control
                  className="my-2"
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter your promoCode"
                />
                <Button
                  type="button"
                  className="btn-block"
                  disabled={promoCode === ''}
                  onClick={checkVoucher}
                  style={{ color: '#ED7014' }}
                >
                  Apply Promocode
                </Button>
              </ListGroup.Item>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={2000}
          autohide
          style={{
            backgroundColor: '#FAFAFA',
            margin: 'auto',
            position: 'absolute',
            top: '0',
            left: '0',
            bottom: '0',
            right: '0',
            maxHeight: '50px',
          }}
        >
          <Toast.Body>{toastMsg}</Toast.Body>
        </Toast>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
