import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import {} from '../redux/actions/userActions'
import { saveShippingAdrees } from '../redux/actions/cartActions'
import CheckOutSteps from '../components/CheckOutSteps'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // preload local state with state from redux store
  const [address, setaddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setZipCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAdrees({ address, city, postalCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckOutSteps step1={true} step2={true} />
      {/* equivalant to <CheckOutSteps step1={true} step2={true} /> */}

      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>city</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postalCode'
            value={postalCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          className='mt-3'
          type='submit'
          variant='primary'
          disabled={!(address || postalCode || city || country)}
        >
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
