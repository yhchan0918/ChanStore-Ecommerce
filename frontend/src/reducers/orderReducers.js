import {
  ORDER_CREATE,
  ORDER_DELIVERED,
  ORDER_DETAILS,
  ORDER_LIST,
  ORDER_LIST_MY,
  ORDER_PAY,
} from '../constants/orderConstants';

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE.INITIAL:
      return {};
    case ORDER_CREATE.AWAIT:
      return {
        loading: true,
      };
    case ORDER_CREATE.SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      };

    case ORDER_CREATE.FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS.AWAIT:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS.SUCCESS:
      return {
        loading: false,
        order: payload,
      };

    case ORDER_DETAILS.FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_PAY.AWAIT:
      return {
        loading: true,
      };
    case ORDER_PAY.SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_PAY.FAIL:
      return {
        loading: false,
        error: payload,
      };

    case ORDER_PAY.RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliveredReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DELIVERED.AWAIT:
      return {
        loading: true,
      };
    case ORDER_DELIVERED.SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case ORDER_DELIVERED.FAIL:
      return {
        loading: false,
        error: payload,
      };

    case ORDER_DELIVERED.RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST_MY.AWAIT:
      return {
        loading: true,
      };
    case ORDER_LIST_MY.SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case ORDER_LIST_MY.FAIL:
      return {
        loading: false,
        error: payload,
      };

    case ORDER_LIST_MY.RESET:
      return { orders: [] };

    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_LIST.AWAIT:
      return {
        loading: true,
      };
    case ORDER_LIST.SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case ORDER_LIST.FAIL:
      return {
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
