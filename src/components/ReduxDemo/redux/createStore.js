export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let state;
  let listeners = [];
  const getState = () => {
    return state;
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  };
  const subscribe = (fn) => {
    listeners.push(fn);
  };
  const unSubscribe = (fn) => {
    listeners = listeners.filter((listener) => listener !== fn);
  };

  // 初始化
  dispatch({ type: "xxx" });

  return {
    getState,
    dispatch,
    subscribe,
    unSubscribe,
  };
}
