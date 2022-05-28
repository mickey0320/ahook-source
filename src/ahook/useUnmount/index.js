import { useEffect } from "react";

import useLatest from "../useLatest";

function useUnmount(fn) {
  const fn = useLatest(fn);
  return useEffect(() => {
    return () => fn.current();
  }, []);
}

export default useUnmount;
