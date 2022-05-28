import { useCallback, useState } from "react";

function useUpdate() {
  const [_, update] = useState({});

  return useCallback(() => {
    return update({});
  }, []);
}

export default useUpdate;
