import useRequestImplement from "./useRequestImplement";

import useLoadingDelayPlugin from "./plugins/useLoadingDelayPlugin";
import usePollingPlugin from "./plugins/usePollingPlugin";

function useRequest(service, options, plugins = []) {
  return useRequestImplement(service, options, [
    useLoadingDelayPlugin,
    usePollingPlugin,
    ...plugins,
  ]);
}

export default useRequest;
