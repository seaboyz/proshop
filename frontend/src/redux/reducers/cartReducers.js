import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants'

export const cartReducer = (
  state = {
    cartItems: [],
    shippingAddress: {},
  },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // new item: from payload
      const newItem = action.payload
      // existitem: from store if the id matchs the new item id
      const existItem =
        state.cartItems && state.cartItems.find((x) => x.id === newItem.id)
      if (existItem) {
        return {
          ...state,
          // replace the existItem with new item in cartItems array
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? newItem : x
          ),
        }
      } else {
        // add payload to the cartItems array
        return { ...state, cartItems: [...state.cartItems, newItem] }
      }

    case CART_REMOVE_ITEM:
      const id = action.payload
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== id),
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }

    default:
      return state
  }
}
