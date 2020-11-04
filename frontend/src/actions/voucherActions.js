import {
  VOUCHER_LIST_REQUEST,
  VOUCHER_DETAIL_REQUEST,
  VOUCHER_DELETE_REQUEST,
  VOUCHER_CREATE_REQUEST,
  VOUCHER_EDIT_REQUEST,
} from '../constants/voucherConstants';
import axios from 'axios';

export const getVoucherList = (pageNumber = '') => async (dispatch) => {
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

export const deleteVoucher = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VOUCHER_DELETE_REQUEST.AWAIT,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/vouchers/${id}`, config);
    dispatch({
      type: VOUCHER_DELETE_REQUEST.SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_DELETE_REQUEST.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createVoucher = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: VOUCHER_CREATE_REQUEST.AWAIT,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/vouchers`, {}, config);
    dispatch({
      type: VOUCHER_CREATE_REQUEST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_CREATE_REQUEST.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editVoucher = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VOUCHERT_EDIT_REQUEST.AWAIT,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/vouchers/${id}`, product, config);
    dispatch({
      type: VOUCHER_EDIT_REQUEST.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOUCHER_EDIT_REQUEST.FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
