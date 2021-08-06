import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Form } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../redux/actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

const PaymentMethodScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  !shippingAddress && history.push('/shipping')

  const [paymentMedhod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMedhod))
    history.push('/placeOrder')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      {/* equivalant to <CheckOutSteps step1={true} step2={true} /> */}

      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
            />
          </Col>
          {/* <Col>
            <Form.Check
              type='radio'
              label='Visa'
              id='visa'
              name='paymentMethod'
              value='visa'
              onChange={(e) => {
                setPaymentMethod(e.target.value)
              }}
            />
          </Col> */}
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen
