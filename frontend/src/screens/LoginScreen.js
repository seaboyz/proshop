import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../redux/actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin) /* redux state */
  const { loading, error, userInfo } = userLogin

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/' /* react router url */

  // anytime the dependency [history,userInfo,redirect] changes,
  // userInfo is from localstorage =>
  // every time localstorage changes redirect to the new url
  // check the userInfo to redirect to the redirect url
  useEffect(() => {
    if (userInfo) {
      // redirect to redirect url
      history.push(redirect)
    }
    // otherwise stay in the current /login url
  }, [history, userInfo, redirect])

  // after submit dispatch the login action
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={email}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Passowrd</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Form.Group>
        <Button type='submit' variant='primary' disabled={!email || !password}>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{'  '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
