import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETIALS_REQUEST,
    PRODUCT_DETIALS_SUCCESS,
    PRODUCT_DETIALS_FAIL,
} from '../constants/productConstants'

export function productListReducer(state = { products: [] }, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export function productDetailReducer(
    state = { product: { reviews: [] } },
    action
) {
    switch (action.type) {
        case PRODUCT_DETIALS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETIALS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETIALS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
