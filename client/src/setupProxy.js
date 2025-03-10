const { createProxyMiddleware } = require('http-proxy-middleware');

const devPort = process.env.REACT_APP_DEV_SERVER_PORT || 3001;
const prodPort = 3000;
const port = process.env.NODE_ENV.toLowerCase().startsWith('prod') ? prodPort : devPort;
const paths = ['/api', '/logout', '/login', '/user', '/callback'];

module.exports = function (app) {
  paths.forEach((path) => {
    const target = `http://localhost:${port}/${path}`;
    app.use(
      path,
      createProxyMiddleware({
        target,
        changeOrigin: true,
        xfwd: true,
      }),
    );
  });
};
