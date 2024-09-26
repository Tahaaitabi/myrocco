const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const searchRegions = require('./controllers/searchController');
const regions = require('./regions');
const PORT = process.env.PORT || 5000;


const server = http.createServer((req, res) => {

  const urlObject = url.parse(req.url, true);
  let pathname = urlObject.pathname;
  const method = req.method;
  req.query = urlObject.query.search

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const localPath = path.join(__dirname, 'frontend', pathname); //update local path.
  //Serve local files (html, css, js, assets)
  fs.readFile(localPath, (err, data) => {
    if (err) {
      if (req.url.startsWith('/api/search')) {
        return searchRegions(req, res);
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 - Not Found');
      }
    } else {
      //Check what the filetype is
      const filetype = path.extname(localPath);
      let contentType = 'text/html'; //default is html.

      switch (filetype) {
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'application/javascript';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.jpeg':
        case '.jpg':
          contentType = 'image/jpeg';
          break;
        case '.png':
          contentType = 'image/png';
          break;
      }

      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})
