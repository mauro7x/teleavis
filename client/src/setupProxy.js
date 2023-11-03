const { createProxyMiddleware } = require('http-proxy-middleware');

const devPort = 3001;
const prodPort = 3000;

module.exports = function (app) {
  const port = process.env.NODE_ENV.startsWith('prod') ? prodPort : devPort;
  app.use(
    ['/api', '/logout', '/login', '/user', '/callback'],
    createProxyMiddleware({
      target: `http://localhost:${port}`,
      changeOrigin: true,
      xfwd: true,
    }),
  );
};
