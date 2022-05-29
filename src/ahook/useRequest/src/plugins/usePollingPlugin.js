import { useRef } from "react";
import useUpdateEffect from "../../../useUpdateEffect";
import { isDocumentVisible } from "../../../utils";
import subscribeVisible from "../../../utils/subscribeVisible";

function usePollingPlugin(
  fetchInstance,
  { pollingInterval, pollingWhenHidden }
) {
  const timerRef = useRef();
  const unsubscribeRef = useRef();

  useUpdateEffect(() => {
    if (!pollingInterval) {
      clearTimeout(timerRef.current);
    }
  }, [pollingInterval]);

  const stopPolling = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    unsubscribeRef.current?.();
  };

  if (!pollingInterval) return {};

  return {
    onBefore() {
      stopPolling();
    },
    onFinally() {
      if (!pollingWhenHidden && !isDocumentVisible()) {
        subscribeVisible(() => fetchInstance.refresh());
        return;
      }
      timerRef.current = setTimeout(() => {
        fetchInstance.refresh();
      }, pollingInterval);
    },
  };
}

export default usePollingPlugin;
