import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_CREATE_REVIEW,
  PRODUCT_TOP,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_LIST_REQUEST.AWAIT:
      return { loading: true, ...state };
    case PRODUCT_LIST_REQUEST.SUCCESS:
      return {
        loading: false,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
      };
    case PRODUCT_LIST_REQUEST.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DETAIL_REQUEST.AWAIT:
      return { loading: true, ...state };
    case PRODUCT_DETAIL_REQUEST.SUCCESS:
      return { loading: false, product: payload };
    case PRODUCT_DETAIL_REQUEST.FAIL:
      return { loading: false, error: payload };
    case PRODUCT_DETAIL_REQUEST.RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_DELETE_REQUEST.AWAIT:
      return { loading: true };
    case PRODUCT_DELETE_REQUEST.SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_REQUEST.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REQUEST.AWAIT:
      return { loading: true };
    case PRODUCT_CREATE_REQUEST.SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_CREATE_REQUEST.FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_REQUEST.RESET:
      return {};
    default:
      return state;
  }
};

export const productEditReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_EDIT_REQUEST.AWAIT:
      return { loading: true };
    case PRODUCT_EDIT_REQUEST.SUCCESS:
      return { loading: false, success: true, product: payload };
    case PRODUCT_EDIT_REQUEST.FAIL:
      return { loading: false, error: payload };
    case PRODUCT_EDIT_REQUEST.RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_CREATE_REVIEW.AWAIT:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW.SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW.FAIL:
      return { loading: false, error: payload };
    case PRODUCT_CREATE_REVIEW.RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCT_TOP.AWAIT:
      return { loading: true, products: [] };
    case PRODUCT_TOP.SUCCESS:
      return {
        loading: false,
        products: payload,
      };
    case PRODUCT_TOP.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};
