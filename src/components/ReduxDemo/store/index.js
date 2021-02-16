import { createStore } from "../redux";

const createReducer = (state = 0, action) => {
  /* eslint-disable */
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(createReducer);

export default store;
