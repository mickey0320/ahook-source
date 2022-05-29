import { useEffect, useRef } from "react";

function useUpdateEffect(fn, deps) {
  const isMountedRef = useRef(false);
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    } else {
      fn();
    }
  }, deps);
}

export default useUpdateEffect;
