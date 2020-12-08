import axios from 'axios'

import { CART_ADD_TIEM, CART_REMOVE_TIEM } from '../constants/cartConstants'

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

export function removeFromCart(id) {
    return function (dispatch, getState) {
        dispatch({
            type: CART_REMOVE_TIEM,
            payload: id,
        })

        localStorage.setItem(
            'carItems',
            JSON.stringify(getState().cart.cartItems)
        )
    }
}
