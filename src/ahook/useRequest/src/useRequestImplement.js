import useLatest from "../../useLatest";
import Fetch from "./fetch";
import useUpdate from "../../useUpdate";
import useMount from "../../useMount";
import useCreation from "../../useCreation";

function useRequestImplement(service, options = {}, plugins = []) {
  const { manual } = options;
  const fetchInstaneOptions = options;
  const serviceRef = useLatest(service);
  const subscribe = useUpdate();

  const initState = plugins.map((plugin) =>
    plugin.onInit?.(fetchInstaneOptions).filter(Boolean)
  );

  const fetchInstance = useCreation(
    () =>
      new Fetch(
        serviceRef,
        subscribe,
        fetchInstaneOptions,
        Object.assign({}, ...initState)
      ),
    []
  );
  fetchInstance.pluginImpls = plugins.map((plugin) =>
    plugin(fetchInstance, fetchInstaneOptions)
  );

  useMount(() => {
    if (!manual) {
      fetchInstance.run(options.defaultParams || []);
    }
  });

  return {
    data: fetchInstance.state.data,
    loading: fetchInstance.state.loading,
    error: fetchInstance.state.error,
    run: fetchInstance.run.bind(fetchInstance),
    runAsync: fetchInstance.runAsync.bind(fetchInstance),
    refresh: fetchInstance.refresh.bind(fetchInstance),
    refreshAsync: fetchInstance.refreshAsync.bind(fetchInstance),
  };
}

export default useRequestImplement;
