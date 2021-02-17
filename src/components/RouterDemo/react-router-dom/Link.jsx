import React, { useContext } from "react";
import { RouterContext } from "./Router";

const Link = ({ to, children, ...otherProps }) => {
  const { history } = useContext(RouterContext);
  const handleClick = (event) => {
    event.preventDefault();
    history.push(to);
  };
  return (
    <a href={to} {...otherProps} onClick={handleClick}>
      {children}
    </a>
  );
};

export default Link;
