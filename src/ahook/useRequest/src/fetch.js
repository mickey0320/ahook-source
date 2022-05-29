class Fetch {
  constructor(serviceRef, subscribe, options, initState = {}) {
    this.serviceRef = serviceRef;
    this.subscribe = subscribe;
    this.options = options;

    this.state = {
      data: null,
      loading: false,
      error: undefined,
      params: undefined,
      ...initState,
    };
  }
  setState = (s) => {
    this.state = { ...this.state, ...s };
    this.subscribe();
  };
  async runAsync(...params) {
    const { ...state } = this.runPluginHandler("onBefore", params);
    this.setState({ loading: true, error: undefined, params, ...state });
    this.options.onBefore?.(params);
    try {
      let { servicePromise } = this.runPluginHandler(
        "onRequest",
        this.serviceRef,
        params
      );
      if (!servicePromise) {
        servicePromise = this.serviceRef(...params);
      }
      const data = await servicePromise;
      this.setState({
        loading: false,
        data,
        error: undefined,
      });
      this.options.onSuccess?.(data, params);
      this.runPluginHandler("onSuccess", data, params);
      this.options.onFinally?.(params, data, undefined);
      this.runPluginHandler("onFinally", params, data);
    } catch (error) {
      this.setState({
        loading: true,
        data: undefined,
        error,
      });
      this.options.onError?.(error, params);
      this.runPluginHandler("onError", error, params);
      this.options.onFinally?.(params, undefined, error);
      this.runPluginHandler("onFinally", params, undefined, error);
      throw error;
    }
  }
  async run(...params) {
    this.runAsync(...params).then((error) => {
      //   console.log(error);
    });
  }
  refresh() {
    this.run(...this.state.params);
  }
  refreshAsync() {
    this.runAsync(...this.state.params);
  }
  runPluginHandler = (hookName, ...args) => {
    const res = this.pluginImpls
      .map((pluginImpl) => {
        return pluginImpl[hookName]?.(...args);
      })
      .filter(Boolean);
    return Object.assign({}, ...res);
  };
}

export default Fetch;
