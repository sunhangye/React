import React from 'react';
import ReactDom from 'react-dom';
import Index from '../container/index';



// 客户端入口
// dom已经有 所以需要注水

ReactDom.hydrate(<Index />, document.getElementById('root'))

