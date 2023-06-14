const config = {
  api: {
    host: process.env.REACT_APP_API_HOST || 'localhost',
    port: process.env.REACT_APP_API_PORT || 3000,
    route: process.env.REACT_APP_API_ROUTE || 'api',
    secureProtocols:
      (process.env.REACT_APP_SECURE_PROTOCOLS || 'true').toLowerCase() ===
      'true',
  },
};

export default config;
