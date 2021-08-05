import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer,
  productListReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
})

// get data from locastorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// load data from locastorage as initial state
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}

// thunk: let action creator listProducts return a function instead of a object
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  // use thunk
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
