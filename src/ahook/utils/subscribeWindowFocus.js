import { isDocumentVisible } from "../utils";

let listeners = [];
function subscribe(listener) {
  listeners.push(listener);

  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function revalidate() {
  if (!isDocumentVisible) return;
  listeners.forEach((l) => l());
}
window.addEventListener("visibilitychange", revalidate, false);
window.addEventListener("focus", revalidate, false);

export default subscribe;
