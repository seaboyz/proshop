import {
  PRODUCT_LIST_SUCCESS,
  PPRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FIAL,
  PPRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FIAL,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PPRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_FIAL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PPRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FIAL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
