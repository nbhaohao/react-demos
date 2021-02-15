import { useRef } from "react";

class FormStore {
  constructor() {
    this.state = {};
    this.fields = [];
  }
  setFieldsValue(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.fields.forEach(({ updateFn, name }) => {
      if (name in newState) {
        updateFn();
      }
    });
  }
  getFieldValue(name) {
    return this.state[name];
  }
  registerField(name, updateFn) {
    this.fields.push({
      name,
      updateFn,
    });
  }
  unRegisterField(name) {
    this.fields = this.fields.filter((filed) => filed.name !== name);
  }
}

export function useForm() {
  const formInstance = useRef(new FormStore());
  return [formInstance.current];
}
