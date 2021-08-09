// TODO
// 1.dispatch(payOrder(),paymentResult) successPaymentHandler
//// 2.constants PAY_ORDER...
//// 3.payOrderReducer()
//// 4.add reducer to store
//// 5.actions
//// 6.backend route
//// 7.controller
//// 8.postman test
// 9. implementation in OrderScreen

import React, { useEffect, useState } from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../redux/actions/orderActions'

import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants'

const OrderDetailsScreen = ({ match }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: payment, success: paymentSuccess } = orderPay

  const dispatch = useDispatch()

  // useEffect is first called after the first render
  // then every time the dependencies changes, it is called again
  useEffect(() => {
    if (!order || paymentSuccess) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      loadPaypalSDK()
    } else {
      setSdkReady(true)
    }
  }, [dispatch, orderId, order, paymentSuccess])

  const loadPaypalSDK = async () => {
    const { data: clientId } = await axios.get('/api/config/paypal')
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  // when the page first load,load the loader first;
  // then fetch orderDetials from server
  // after data comes back from server
  //
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h2>Order {order.id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col md={2}>Shipping address</Col>
                <Col md={6}>
                  <p>{order.user.name}</p>
                  <p>{` ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`}</p>
                </Col>
              </Row>
              <Row>
                {order.isDelivered ? (
                  <Message variant='success'>Delivered</Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Payments</Col>
                <Col>
                  <p>{order.paymentMethod}</p>
                </Col>
              </Row>
              <Row>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {order.orderItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map(
                    ({ id, name, image, price, qty, countInStock }) => (
                      <ListGroup.Item key={id}>
                        <Row>
                          <Col md={2}>
                            <Image src={image} alt={name} fluid rounded />
                          </Col>
                          <Col md={3}>
                            <Link to={`/product/${id}`}>{name}</Link>
                          </Col>
                          <Col md={2}>${price}</Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Items (
                    {order.orderItems.reduce((acc, item) => acc + item.qty, 0)})
                  </Col>
                  <Col>
                    $
                    {order.orderItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${Number(order.shippingPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${Number(order.taxPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Order total:</Col>
                  <Col>${Number(order.totalPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {payment && <Loader />}
                  {sdkReady ? (
                    <PayPalButton
                      amount={Number(order.totalPrice).toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  ) : (
                    <Loader />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderDetailsScreen
