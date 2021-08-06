import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'
import {} from '../redux/actions/userActions'
import { saveShippingAdrees } from '../redux/actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // preload local state with state from redux store
  const [street, setStreet] = useState(shippingAddress.street)
  const [city, setCity] = useState(shippingAddress.city)
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAdrees({ street, city, zipCode, country }))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='street'>
          <Form.Label>street</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter street'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
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

        <Form.Group controlId='zipCode'>
          <Form.Label>zipCode</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter zipCode'
            value={zipCode}
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
          type='submit'
          variant='primary'
          disabled={!(street || zipCode || city || country)}
        >
          Next
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
