import { VOUCHER_LIST_REQUEST } from '../constants/voucherConstants';
import axios from 'axios';

export const getVoucherList = (pageNumber = '') => async (dispatch) => {
  dispatch({ type: VOUCHER_LIST_REQUEST.INITIAL });
  try {
    dispatch({ type: VOUCHER_LIST_REQUEST.AWAIT });
    const { data } = await axios.get(`/api/vouchers?pageNumber=${pageNumber}`);
    dispatch({ type: VOUCHER_LIST_REQUEST.SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VOUCHER_LIST_REQUEST.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
