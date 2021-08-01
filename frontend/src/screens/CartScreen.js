import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'

const Cart = ({ match, location, history }) => {
  const id = match.params.id
  // react router location.search : get pareameter after ?
  const qty = location.search ? Number(location.search.slice(-1)) : 1

  const dispatch = useDispatch()

  // after component load, dispatch addToCart action
  // every time id or qty change (from url) dispatch addToCart
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`)
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup>
            {cartItems.map(({ id, name, image, price, qty, countInStock }) => (
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
                      onChange={e =>
                        dispatch(addToCart(id, Number(e.target.value)))
                      }
                    >
                      {[...Array(countInStock).keys()].map(x => (
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
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
