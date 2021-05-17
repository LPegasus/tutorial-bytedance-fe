const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http
  .createServer((req, resp) => {
    const { pathname } = url.pathToFileURL(req.url);
    const filename = path.resolve(__dirname, pathname.replace(/^\//, ''));

    if (req.url === '/') {
      fs.createReadStream(path.resolve(__dirname, 'index.html')).pipe(resp);
      return;
    }
    if (!fs.existsSync(filename)) {
      resp.statusCode = 404;
      resp.end();
      return;
    }
    resp.setHeader('Cache-Control', 'max-age=9999999');
    fs.createReadStream(filename).pipe(resp);
  })
  .listen(3000, () => {
    console.log('listening 3000 port');
  });
