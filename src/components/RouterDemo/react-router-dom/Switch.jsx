import React, { useContext } from "react";
import { RouterContext } from "./Router";
import matchPath from "./matchPath";

const Switch = ({ children }) => {
  const { location, history, match: defaultMatch } = useContext(RouterContext);
  let match = null;
  let element = null;
  React.Children.forEach(children, (child) => {
    if (match === null && React.isValidElement(child)) {
      element = child;
      const { path } = child.props;
      // matchPath 不匹配的时候会返回 null
      match = path
        ? matchPath(location.pathname, {
            path: child.props.path,
            exact: child.props.exact,
          })
        : defaultMatch;
    }
  });
  return match ? React.cloneElement(element, { computedMatch: match }) : null;
};

export default Switch;
