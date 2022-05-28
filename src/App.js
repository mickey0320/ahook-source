import React, { useEffect } from "react";

import { useRequest } from "./ahook";

function fetchUser(args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(args);
    }, 2000);
  });
}
function App() {
  const { data, loading, refresh } = useRequest(fetchUser, {
    defaultParams: ["mickey"],
  });

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <p>{data}</p>
      <button onClick={refresh}>重新刷新</button>
    </div>
  );
}

export default App;
