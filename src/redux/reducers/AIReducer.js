import {actionTypes} from "../actions/actionTypes";

const initialState = {
  isUploading: false,
  isChatOpen: false,
  suggestedProducts: [],
  chatInput: "",
}

export const AIReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHAT_OPEN:
      return {
        ...state,
        isChatOpen: action.payload
      };
    default:
      return state
  }
}