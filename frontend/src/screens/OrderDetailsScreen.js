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

import React, { useEffect } from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder } from '../redux/actions/orderActions'

import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_DETAILS_RESET } from '../redux/constants/orderConstants'
import usePaypalSDK from '../hooks/usePaypal'

const OrderDetailsScreen = ({ match }) => {
  const PaypalIsReady = usePaypalSDK()

  const dispatch = useDispatch()
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, error, order } = orderDetails
  // after the first render, fetch order data to store
  // if match.params.id dont change, it will never fetch again
  // if match.params.id changed, first the clear up will run
  // then do a fetch, update the redux store
  // if leaving the screen,the OrderDetialsScreen is removed,
  // clean up function will run before leaving the screen
  useEffect(() => {
    dispatch(getOrderDetails(match.params.id))

    return () => {
      dispatch({ type: ORDER_DETAILS_RESET })
    }
  }, [match.params.id, dispatch])

  // ater payment success, fetch order data from server
  const orderPay = useSelector((state) => state.orderPay)
  const { loading: paymentLoading, success: paymentSuccess } = orderPay
  useEffect(() => {
    if (paymentSuccess) {
      dispatch(getOrderDetails(match.params.id))
    }
  }, [paymentSuccess, match.params.id, dispatch])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order.id, paymentResult))
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
                  {paymentLoading && <Loader />}
                  {PaypalIsReady ? (
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
