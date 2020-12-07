import axios from 'axios'

import { CART_ADD_TIEM } from '../constants/cartConstants'

export function addToCart(id, qty) {
    return async function (dispatch, getState) {
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: CART_ADD_TIEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        })
        // setItem to local storage
        localStorage.setItem(
            'carItems',
            JSON.stringify(getState().cart.cartItems)
        )
    }
}
