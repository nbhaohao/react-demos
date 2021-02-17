import React, { useEffect, useMemo, useState } from "react";

export const RouterContext = React.createContext();
const computeRootMatch = (pathname) => {
  return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
};
const Router = ({ children, history }) => {
  const [location, setLocation] = useState(history.location);
  const contextValue = useMemo(() => {
    return {
      history,
      location,
      match: computeRootMatch(location.pathname),
    };
  }, [history, location]);
  useEffect(() => {
    return history.listen(({ location }) => {
      setLocation(location);
    });
  }, [history, location]);
  return (
    <RouterContext.Provider value={contextValue}>
      {children}
    </RouterContext.Provider>
  );
};

export default Router;
