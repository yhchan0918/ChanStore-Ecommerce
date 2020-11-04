import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps.js';
import { saveShippingAddress } from '../actions/cartActions.js';
import Map from '../components/Map/Map';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [form, setForm] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(form));
    history.push('/payment');
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setForm({ ...form, [name]: target.value });
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Row className="">
        <Col md={6}>
          <Map setForm={setForm} />
        </Col>
        <Col className md={6}>
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                placeholder="Enter Address"
                value={form.address}
                required
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlled="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                placeholder="Enter City"
                value={form.city}
                required
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlled="postalCode">
              <Form.Label>PostalCode</Form.Label>
              <Form.Control
                name="postalCode"
                placeholder="Enter Postal Code"
                value={form.postalCode}
                required
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlled="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                placeholder="Enter Country"
                value={form.country}
                required
                onChange={(e) => handleInputChange(e)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ShippingScreen;
