import { CART_ADD_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // item: added from the productScreen local state
      const item = action.payload
      // existitem: from the store if match with the item from the  item
      const existItem = state.cartItems.find(x => x.product === item.product)
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? item : x
          ),
        }
      } else {
        return { cartItems: [...state, existItem] }
      }
    default:
      return state
  }
}
