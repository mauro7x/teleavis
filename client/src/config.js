const config = {
  api: {
    host: process.env.REACT_APP_API_HOST || 'localhost',
    route: process.env.REACT_APP_API_ROUTE || 'api',
    secureProtocols:
      (process.env.REACT_APP_SECURE_PROTOCOLS || 'true').toLowerCase() ===
      'true',
  },
};

export default config;
