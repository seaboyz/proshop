import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Row, Col, ListGroup, Image, Form, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'
import { removeFromCart, addToCart } from '../redux/actions/cartActions'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart)
  const {
    shippingAddress: { street, city, zipCode, country },
    cartItems,
    paymentMethod,
  } = cart

  const dispatch = useDispatch()

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const PlaceOrderHandler = () => {}

  const itemsQty = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  )

  const shippingPrice = cartItems.length * 4.99

  const totalBeforeTax = +itemsPrice + +shippingPrice

  const itemsTax = +totalBeforeTax * 0.0825

  const totalPrice = totalBeforeTax + itemsTax

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <strong>Shipping:</strong>
              <p>{`Address: ${street}, ${city} ${zipCode}, ${country}`}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Payments:</strong>
              <p>{paymentMethod}</p>
            </ListGroup.Item>

            {/* list items in the cart*/}
            <ListGroup.Item>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup>
                  {cartItems.map(
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
                          <Col md={2}>
                            <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) =>
                                dispatch(addToCart(id, Number(e.target.value)))
                              }
                            >
                              {[...Array(countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                          <Col md={2}>
                            <Button
                              onClick={() => removeFromCartHandler(id)}
                              type='button'
                              variant='light'
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                  )}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        {cartItems.length !== 0 && (
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h5>Order Summary</h5>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items ({itemsQty})</Col>
                      <Col>${itemsPrice.toFixed(2)}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping & handling</Col>
                      <Col>${shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total before tax:</Col>
                      <Col>${totalBeforeTax.toFixed(2)}</Col>
                    </Row>
                    <Row>
                      <Col>Tax:</Col>
                      <Col>{itemsTax.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Col>
                      <h4>Order total:</h4>
                      <Col>{totalPrice.toFixed(2)}</Col>
                    </Col>
                    <Col></Col>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn-block'
                      disabled={cartItems.length === 0}
                      onClick={PlaceOrderHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </>
  )
}

export default PlaceOrderScreen
