import React from 'react'
import express from 'express';
import {  renderToString, renderToNodeStream } from 'react-dom/server';
import App from '../container/index'
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  let content = renderToString(<App />)
  res.send(
    `
    <html>
      <head>
        <title>sunhy ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="/index.js"></script>
      </body>
    </html>
    `
  )
})

app.listen(9002, () => {
  console.log('启动成功 9002');
  
})