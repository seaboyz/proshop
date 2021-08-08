import React, { useEffect } from 'react'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../redux/actions/orderActions'

const OrderDetailsScreen = ({ match }) => {
  const dispatch = useDispatch()

  const orderId = match.params.id

  const orderDetails = useSelector((state) => state.orderDetails)

  const { loading, success, error, order } = orderDetails

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, order])

  return (
    <div>
      <h2>Order {match.params.id}</h2>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {success && (
        <>
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
                      <Message variant='success'>
                        Paid on {order.paidAt}
                      </Message>
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
                        {order.orderItems.reduce(
                          (acc, item) => acc + item.qty,
                          0
                        )}
                        )
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
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Order total:</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}

export default OrderDetailsScreen
