var http = require('http');
var url = require('url');
var util = require('util');
var fs = require("fs");
var querystring = require('querystring');
http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log("get post")
  var post = '';

  req.on('data', function (chunk) {
    post += chunk;
  });

  req.on('end', function () {
    post = querystring.parse(post);
    // console.log(post.data)
    var content = post.data;
    // console.log(content)
    var file = './' + post.title + '.json';

    fs.writeFileSync(file, content);

    let index = JSON.parse(fs.readFileSync('./index.json'))
    index[post.title] = JSON.parse(post.data).title
    fs.writeFileSync('./index.json', JSON.stringify(index, null, '\t'))
    console.log(index)
    setTimeout(function () {
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end(util.inspect(url.parse(req.url, true)));
    }, 1000)

  });

}).listen(3000);


