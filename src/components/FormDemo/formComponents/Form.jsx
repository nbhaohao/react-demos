import React, { useImperativeHandle } from "react";
import { FormContext } from "./FormContext";

const Form = React.forwardRef(({ children, form }, ref) => {
  useImperativeHandle(ref, () => {
    return form;
  });
  return (
    <FormContext.Provider value={form}>
      <form>{children}</form>
    </FormContext.Provider>
  );
});

export default Form;
