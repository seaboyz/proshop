import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

// locastorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = { cart: { cartItems: cartItemsFromStorage } }
// let action creator listProducts return a function instead of a object
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  // use thunk
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
