import axios from 'axios'
import {
    PRODUCT_LIST_SUCCESS,
    PPRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FIAL,
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
