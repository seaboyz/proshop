import React, { useEffect, useDispatch } from 'react'
import { useDispatc } from 'react-redux'
import {} from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

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

  return <div>Cart</div>
}

export default Cart
