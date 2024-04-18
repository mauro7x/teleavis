const { createProxyMiddleware } = require('http-proxy-middleware');

const port = process.env.REACT_APP_DEV_SERVER_PORT || 3000;
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
