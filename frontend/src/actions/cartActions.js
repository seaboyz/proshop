import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  // update application state
  // https://redux.js.org/api/store#dispatchaction
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty: qty,
    },
  })

  // update localStorage with the current state tree of your application
  // https://redux.js.org/api/store#getstate
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
