import { createStore } from "redux";

const reducer = (state = {
  copyContent: null
}, action) => {
  switch(action.type) {
    case "SET_COPY_CONTENT":
      return {
        ...state,
        copyContent: action.payload
      }
    case "CLEAR_COPY_CONTENT":
      return {
        ...state,
        copyContent: null
      }
    default:
        return state;
  }
}

const store = createStore(reducer);

export default store;