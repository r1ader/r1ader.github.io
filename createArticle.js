var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
  res.end(util.inspect(url.parse(req.url, true)));
  console.log("get post")
}).listen(3000);


