import React from "react";

const Input = (props) => {
  const { value, ...otherProps } = props;
  return <input value={value || ""} {...otherProps} />;
};

export default Input;
