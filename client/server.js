var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  fs.readFile('index.html', function(err, data) {
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
    });
    response.write(data);
    response.end();
  }); 
  
  //console.log(request.method);
  //console.log(request.headers);
  //console.log(request.url);
  
}).listen(8080);
