import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (
  state = {
    cartItems: [],
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // new item: from payload
      const newItem = action.payload
      // existitem: from store if the id matchs the new item id
      const existItem =
        state.cartItems && state.cartItems.find(x => x.id === newItem.id)
      if (existItem) {
        return {
          ...state,
          // replace the existItem with new item in cartItems array
          cartItems: state.cartItems.map(x =>
            x.id === existItem.id ? newItem : x
          ),
        }
      } else {
        // add payload to the cartItems array
        return { cartItems: [...state.cartItems, newItem] }
      }

    case CART_REMOVE_ITEM:
      const id = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== id),
      }

    default:
      return state
  }
}
