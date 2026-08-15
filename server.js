// 临时本地预览服务器（仅开发用，不上传线上）
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.md': 'text/plain; charset=utf-8',
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  const filePath = path.join(root, urlPath === '/' ? 'index.html' : urlPath);
  if (!filePath.startsWith(root)) { res.writeHead(403).end(); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404).end('Not Found: ' + urlPath); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(4173, () => console.log('blog preview: http://127.0.0.1:4173/'));
