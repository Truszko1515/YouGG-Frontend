import React from "react";
import { useState, useEffect } from "react";

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState("")

  const loadDataOnlyOnce = () => {
    console.log("load Data Only Once");
  };

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, [state]);

  return (
    <>
     <strong>{count}</strong>
     <button onClick={() => setCount(count + 1)}>
        Increment
     </button>
     <button onClick={() => setCount(count - 1)}>
        Decrement
     </button>
    </>
  );
};

export default MyComponent;
