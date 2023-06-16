const host = process.env.REACT_APP_API_HOST || 'localhost:3000';
const secureProtocols =
  (process.env.REACT_APP_SECURE_PROTOCOLS || 'true').toLowerCase() === 'true';

const config = {
  api: {
    host,
    route: process.env.REACT_APP_API_ROUTE || 'api',
    secureProtocols,
    baseUrl: `${secureProtocols ? 'https' : 'http'}://${host}`,
  },
};

export default config;
