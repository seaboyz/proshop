import axios from 'axios'
import {
    PRODUCT_LIST_SUCCESS,
    PPRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FIAL,
    PPRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FIAL,
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
    try {
        dispatch({ type: PPRODUCT_LIST_REQUEST })

        const { data } = await axios.get('/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FIAL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listProductDetails = id => async dispatch => {
    try {
        dispatch({ type: PPRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FIAL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
