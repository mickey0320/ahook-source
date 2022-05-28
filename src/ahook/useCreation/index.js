import { useRef } from "react";

import { sameDeps } from "../utils";

function useCreation(factory, deps) {
  const { current } = useRef({
    deps,
    obj: undefined,
    initialized: false,
  });
  if (!current.initialized || !sameDeps(deps, current.deps)) {
    current.obj = factory();
    current.deps = deps;
    current.initialized = true;
  }

  return current.obj;
}

export default useCreation;
