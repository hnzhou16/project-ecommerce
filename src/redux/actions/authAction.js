import {actionTypes} from "./actionTypes";

export const setToken = (token) => {
  return {
    type: actionTypes.SET_TOKEN,
    payload: token,
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};

export const setUserId = (userId) => {
  return {
    type: actionTypes.SET_USERID,
    payload: userId,
  };
};

export const loginSuccess = () => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const addUserInfo = (userInfo) => {
  return {
    type: actionTypes.ADD_USER_INFO,
    payload: userInfo
  }
}

