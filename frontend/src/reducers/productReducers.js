import {
    PRODUCT_LIST_SUCCESS,
    PPRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FIAL,
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
