const path = require('path');
const express = require('express');

const basePath = __dirname;
const fs = require('fs');

const compression = require('compression');
const next = require('next');
const helmet = require('helmet');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const routes = require('../routes');

const port = parseInt(process.env.PORT, 10) || 3100;
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const app = next({ dev });

const handler = routes.getRequestHandler(app);

const nextI18next = require('../i18n');
// const packageJsonPath = path.join(basePath, '../package.json')

app.prepare().then(() => {
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));
  server.use(helmet());
  server.use(compression());

  const staticPath = path.join(basePath, '../static');
  const packageJsonPath = path.join(basePath, '../package.json');

  server.use('/static', express.static(staticPath, {
    maxAge: '30d',
    immutable: true
  }));

  server.get('/app-version', (req, res) => {
    const pckgFilePath = packageJsonPath;
    const { version } = JSON.parse(fs.readFileSync(pckgFilePath, 'utf8'));
    res.setHeader('Cache-Control', 'no-cache; no-store; must-revalidate');
    res.send(version);
  });

  server.get('*', (req, res) => handler(req, res));

  const PER_REQ_TIMEOUT = 122 * 1000;
  server.on('connection', (socket) => (socket.setTimeout(PER_REQ_TIMEOUT)));

  function startServer() {
    server.listen(port, () => (console.log(`server started on ${port} in ${process.env.NODE_ENV} mode`)));
  }
  startServer();

  /* ***** runs only in production **** */
  if (prod) {
    // so the program will not close instantly
    process.stdin.resume();
    // this function is called when you want the server to die gracefully, i.e. wait for existing connections
    const gracefulShutdown = () => {
      // max time out for the server
      setTimeout(() => { process.exit(0); }, 5 * 1000);
    };
    // listen for TERM signal .e.g. kill
    process.on('SIGTERM', gracefulShutdown);
    // listen for INT signal e.g. Ctrl-C
    process.on('SIGINT', gracefulShutdown);
    process.on('uncaughtException', (e) => { console.log(e); });
  }
});
