import { useEffect } from "react";

function useMount(fn) {
  return useEffect(() => fn(), []);
}

export default useMount;
