const http = require('http'),
fs = require('fs'),
url = require('url');

http.createServer((request, response) => {
  var addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }
  
}).listen(8080);
console.log('My test server is running on Port 8080.');