import React, { useState, useEffect, useCallback } from "react";
import store from "./store";

const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return useCallback(() => setValue((value) => value + 1), [setValue]);
};

const ReduxDemo = () => {
  const forceUpdateFn = useForceUpdate();
  useEffect(() => {
    const updateFn = () => {
      forceUpdateFn();
    };
    store.subscribe(updateFn);
    return () => {
      store.unSubscribe(updateFn);
    };
  }, [forceUpdateFn]);
  return (
    <div>
      {store.getState()}
      <button
        onClick={() => {
          store.dispatch({ type: "ADD" });
        }}
      >
        add
      </button>
    </div>
  );
};

export default ReduxDemo;
