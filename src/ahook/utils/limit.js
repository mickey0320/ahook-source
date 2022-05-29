function limit(fn, timeSpan) {
  let pending = false;
  return (...args) => {
    if (pending) return;
    pending = true;
    fn(...args);
    setTimeout(() => {
      pending = false;
    }, timeSpan);
  };
}

export default limit;
