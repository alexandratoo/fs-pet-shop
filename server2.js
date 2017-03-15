'use strict'

const http = reuire('http')
const url = require('url')
const fs = require('fs')
const server = http.createServer((req, res) =>{
  res.statusCode = 200
  res.setHeader('Content-type', 'text/plain')
  fs.readFile('cupcakes.html','utf8', function(err, data) =>{
    //notsure what to do
    if (err) throw err
    res.end(data)
  })

})
server.listen(port, (err) => {
  if (err) throw console.error(console.log("doing the listening on port"));
})
