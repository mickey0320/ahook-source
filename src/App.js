import React, { useEffect, useState } from "react";

import { useRequest } from "./ahook";

function fetchUser(args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(args);
    }, 3000);
  });
}
function App() {
  console.log("render");
  const [val, setVal] = useState("a");
  // let data = "";
  // function refresh() {}
  const { data, loading, refresh } = useRequest(fetchUser, {
    defaultParams: ["mickey"],
    loadingDelay: 2000,
  });

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <p>{data}</p>
      {/* <button onClick={() => setVal("b")}>{val}</button> */}
      <button onClick={refresh}>重新刷新</button>
    </div>
  );
}

export default App;
