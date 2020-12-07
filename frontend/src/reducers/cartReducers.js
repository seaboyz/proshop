import { CART_ADD_TIEM } from '../constants/cartConstants'

export function cartReducer(state = { cartItems: [] }, action) {
    switch (action.type) {
        case CART_ADD_TIEM:
            const item = action.payload

            const existItem = state.cartItems.find(
                x => x.product === item.product
            )
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        default:
            return state
    }
}
