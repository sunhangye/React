import React, { useState } from 'react';

// node渲染ssr 使用babel
const Index = () => {
  let [count, setCount] = useState(1)
  console.log(count);
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>加一</button>
    </div>
  )
}

export default Index

