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

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!')
})

app.listen(port, () => {
  console.log(`La aplicación se está ejecutando en http://localhost:${port}`)
})
