import { useEffect } from "react";
import subscribeWindowFocus from "../../../utils/subscribeWindowFocus";
import limit from "../../../utils/limit";

function useRefreshOnWindowFocusPlugin(
  fetchInstance,
  { refreshOnWindowFocus, focusTimespan = 5000 }
) {
  useEffect(() => {
    if (!refreshOnWindowFocus) {
      return;
    }
    const limitRefresh = limit(() => fetchInstance.refresh(), focusTimespan);
    const unsubscribe = subscribeWindowFocus(limitRefresh);

    return () => {
      unsubscribe();
    };
  }, [refreshOnWindowFocus, focusTimespan]);

  return {};
}

export default useRefreshOnWindowFocusPlugin;
