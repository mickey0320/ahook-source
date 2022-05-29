import { useRef } from "react";

function useLoadingDelayPlugin(fetchInstance, { loadingDelay }) {
  console.log("useLoadingDelayPlugin");
  const timerRef = useRef();
  if (!loadingDelay) {
    return {};
  }
  return {
    onBefore() {
      console.log("onBefore");
      timerRef.current = setTimeout(() => {
        fetchInstance.setState({
          loading: true,
        });
      }, loadingDelay);

      return {
        loading: false,
      };
    },
    onFinally() {
      clearTimeout(timerRef.current);
    },
  };
}

export default useLoadingDelayPlugin;
