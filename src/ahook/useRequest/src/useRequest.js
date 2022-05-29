import useRequestImplement from "./useRequestImplement";

import useLoadingDelayPlugin from "./plugins/useLoadingDelayPlugin";

function useRequest(service, options, plugins = []) {
  return useRequestImplement(service, options, [
    useLoadingDelayPlugin,
    ...plugins,
  ]);
}

export default useRequest;
