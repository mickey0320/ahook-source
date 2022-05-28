function useLoggerPlugin(fetchInstance, fetchOptions) {
  return {
    onBefore() {},
    onRequest() {},
    onSuccess() {},
    onError() {},
    onFinally() {},
  };
}

useLoggerPlugin.onInit = function (fetchOptions) {
  return {};
};

export default useLoggerPlugin;
