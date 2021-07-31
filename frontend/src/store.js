import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productListReducer } from "./reducers/productReducers"

const reducer = combineReducers({
  productList: productListReducer,
})

const initialState = {}
// let action creator listProducts return a function instead of a object
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
