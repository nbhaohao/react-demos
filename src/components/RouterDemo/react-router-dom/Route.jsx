import React, { useContext } from "react";
import { RouterContext } from "./Router";
import matchPath from "./matchPath";

const Route = ({ children, path, component, render, exact }) => {
  const { location, history, match: defaultMatch } = useContext(RouterContext);
  const match = path
    ? matchPath(location.pathname, {
        path,
        exact,
      })
    : defaultMatch;
  const childProps = { location, history, match };
  console.log(match);
  if (match) {
    if (children)
      return typeof children === "function" ? children(childProps) : children;
    if (component) return React.createElement(component, childProps);
    if (render) return render(childProps);
    return null;
  } else {
    if (typeof children === "function") {
      return children(childProps);
    }
    return null;
  }
  // return match ? React.createElement(component, childProps) : null;
};

export default Route;
