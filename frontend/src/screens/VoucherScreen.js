import React, { useEffect, useState } from 'react';
import { Row, Col, Badge, Card, Button, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getVoucherList } from '../actions/voucherActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const VoucherScreen = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const voucherList = useSelector((state) => state.voucherList);
  const { vouchers, loading, error } = voucherList;
  useEffect(() => {
    dispatch(getVoucherList());
  }, [dispatch]);

  const handleCopyPromocode = (code) => {
    var textField = document.createElement('textarea');
    textField.innerText = code;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setShow(true);
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          vouchers.map((voucher) => (
            <div key={voucher._id}>
              {voucher.numOfUsed < voucher.limitUsed && (
                <Col>
                  <Card className="mx-auto">
                    <Card.Body>
                      <Card.Title>{voucher.name}</Card.Title>
                      <Card.Text>
                        <span className="d-block font-weight-bold">
                          Min Spend: RM{voucher.minSpend}
                        </span>
                        <span className="d-block font-weight-bold">
                          Discount Rate: {voucher.discountRate * 100}%
                        </span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <h1 className="text-center d-block">
                        <Badge variant="info">{voucher.promoCode}</Badge>
                      </h1>
                      <Button
                        type="button"
                        block
                        onClick={() => handleCopyPromocode(voucher.promoCode)}
                      >
                        Copy To ClipBoard
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              )}
            </div>
          ))
        )}
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
          <Toast.Body>Successfully Copied!</Toast.Body>
        </Toast>
      </Row>
    </div>
  );
};

export default VoucherScreen;
