const compose = (...args) => {
  return args.reduce((previousFn, currentFn) => {
    return (...args) => previousFn(currentFn(...args));
  });
};

export function applyMiddleware(...middlewares) {
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    const middleApi = {
      dispatch: (action, ...args) => dispatch(action, ...args),
      getState: store.getState,
    };
    const middlewaresChain = middlewares.map((middleware) =>
      middleware(middleApi)
    );
    dispatch = compose(...middlewaresChain)(store.dispatch);
    return {
      ...store,
      dispatch,
    };
  };
}
