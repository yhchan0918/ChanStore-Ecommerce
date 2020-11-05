import { CART_ACTION } from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: '' },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION.ADD_ITEM:
      const item = payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_ACTION.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };

    case CART_ACTION.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };

    case CART_ACTION.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    case CART_ACTION.RESET:
      return { cartItems: [], shippingAddress: {}, paymentMethod: '' };

    default:
      return state;
  }
};
