import React, { useRef } from "react";
import { createBrowserHistory } from "history";
import Router from "./Router";

const BrowserRouter = ({ children }) => {
  const history = useRef(createBrowserHistory());
  return <Router history={history.current}>{children}</Router>;
};

export default BrowserRouter;
