import {actionTypes} from "../actions/actionTypes";

const userSaved = localStorage.getItem('user')
const initState = {
  token: '',
  user: userSaved ? JSON.parse(userSaved) : null,
  userId: userSaved ? JSON.parse(userSaved).id : null,
  login: false,
  userInfo: {}
}

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.SET_USERID:
      return {
        ...state,
        userId: action.payload
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: true,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        login: false,
      };

    case actionTypes.ADD_USER_INFO:
      console.log(action.payload)
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return state;
  }
}