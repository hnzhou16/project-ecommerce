import {actionTypes} from "./actionTypes";

export const setChatOpen = (value) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.SET_CHAT_OPEN,
    payload: value,
  });
};