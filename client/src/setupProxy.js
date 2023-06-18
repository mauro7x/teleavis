const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.REACT_APP_DEV_SERVER_PORT || 3000;

module.exports = function (app) {
  app.use(
    ['/api', '/logout', '/login', '/user', '/callback'],
    createProxyMiddleware({
      target: `http://localhost:${port}`,
      changeOrigin: true,
      xfwd: true,
    }),
  );
};
