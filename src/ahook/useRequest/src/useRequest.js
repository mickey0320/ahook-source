import useRequestImplement from "./useRequestImplement";

import useLoadingDelayPlugin from "./plugins/useLoadingDelayPlugin";
import usePollingPlugin from "./plugins/usePollingPlugin";
import useRefreshOnWindowFocusPlugin from "./plugins/useRefreshOnWindowFocusPlugin";

function useRequest(service, options, plugins = []) {
  return useRequestImplement(service, options, [
    useLoadingDelayPlugin,
    usePollingPlugin,
    useRefreshOnWindowFocusPlugin,
    ...plugins,
  ]);
}

export default useRequest;
