/*'use strict';

const http = require('http');

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});

server.listen(5000);
*/

const express = require('express')
const app = express()
const port = 3000

app.get('/prueba', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`La app se está ejecutando por el puerto`)
})