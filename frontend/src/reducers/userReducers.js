import {
  USER_DETAILS,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_UPDATE_PROFILE,
  USER_LIST,
  USER_DELETE,
  USER_EDIT,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN.AWAIT:
      return { loading: true };
    case USER_LOGIN.SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_LOGIN.FAIL:
      return { loading: false, error: payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_REGISTER.AWAIT:
      return { loading: true };
    case USER_REGISTER.SUCCESS:
      return { loading: false, userInfo: payload };
    case USER_REGISTER.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DETAILS.AWAIT:
      return { ...state, loading: true };
    case USER_DETAILS.SUCCESS:
      return { loading: false, user: payload };
    case USER_DETAILS.FAIL:
      return { loading: false, error: payload };
    case USER_DETAILS.RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_UPDATE_PROFILE.AWAIT:
      return { ...state, loading: true };
    case USER_UPDATE_PROFILE.SUCCESS:
      return { loading: false, success: true, userInfo: payload };
    case USER_UPDATE_PROFILE.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LIST.AWAIT:
      return { loading: true };
    case USER_LIST.SUCCESS:
      return { loading: false, users: payload };
    case USER_LIST.FAIL:
      return { loading: false, error: payload };
    case USER_LIST.RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_DELETE.AWAIT:
      return { loading: true };
    case USER_DELETE.SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE.FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userEditReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_EDIT.AWAIT:
      return { loading: true };
    case USER_EDIT.SUCCESS:
      return { loading: false, success: true };
    case USER_EDIT.FAIL:
      return { loading: false, error: payload };
    case USER_EDIT.RESET:
      return { user: {} };
    default:
      return state;
  }
};
