const { createServer } = require('http');
const next = require('next');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
});
