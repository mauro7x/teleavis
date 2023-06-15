const host = process.env.REACT_APP_API_HOST || 'localhost';
const port = process.env.REACT_APP_API_PORT || 3000;
const secureProtocols =
  (process.env.REACT_APP_SECURE_PROTOCOLS || 'true').toLowerCase() === 'true';

const config = {
  api: {
    host,
    port,
    route: process.env.REACT_APP_API_ROUTE || 'api',
    secureProtocols,
    baseUrl: `${secureProtocols ? 'https' : 'http'}://${host}:${port}`,
  },
};

export default config;
