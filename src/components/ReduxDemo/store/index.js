import { createStore, applyMiddleware } from "../redux";
// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

function logger({ getState }) {
  return (next) => (action) => {
    console.log("触发 loger");
    console.log("prev state", getState());
    let returnValue = next(action);
    console.log("next state", getState());
    return returnValue;
  };
}

function thunk({ dispatch, getState }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    } else {
      return next(action);
    }
  };
}

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

const store = createStore(createReducer, applyMiddleware(thunk, logger));

export default store;
