import { useState, useCallback } from "react";
export function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  const fn = useCallback(() => setValue((value) => value + 1), []);
  return fn; // update the state to force render
}
