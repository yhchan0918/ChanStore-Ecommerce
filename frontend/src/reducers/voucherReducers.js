import { VOUCHER_LIST_REQUEST } from '../constants/voucherConstants';

export const voucherListReducer = (
  state = { loading: true, vouchers: [] },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case VOUCHER_LIST_REQUEST.INITIAL:
      return {
        loading: true,
        vouchers: [],
      };
    case VOUCHER_LIST_REQUEST.AWAIT:
      return {
        ...state,
        loading: true,
      };
    case VOUCHER_LIST_REQUEST.SUCCESS:
      return {
        loading: false,
        vouchers: payload.vouchers,
      };

    case VOUCHER_LIST_REQUEST.FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
