import React, { useContext, useEffect } from "react";
import { FormContext } from "./FormContext";
import { useForceUpdate } from "./useForceUpdate";

const Field = ({ children, name }) => {
  const forceUpdateFn = useForceUpdate();
  const form = useContext(FormContext);
  const newChildren = React.cloneElement(children, {
    value: form.getFieldValue(name),
    onChange: (event) => {
      form.setFieldsValue({
        [name]: event.target.value,
      });
    },
  });
  useEffect(() => {
    form.registerField(name, forceUpdateFn);
    return () => {
      form.unRegisterField(name);
    };
  }, [forceUpdateFn, form, name]);
  return <div>{newChildren}</div>;
};

export default Field;
