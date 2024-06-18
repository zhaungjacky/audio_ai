const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/v2/api', {
      target: 'https://raasr.xfyun.cn', // API endpoint 1
      changeOrigin: true,
      pathRewrite: {
        "^/v2/api": "/v2/api",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
  app.use(
    createProxyMiddleware('/api', {
      target: "https://10.100.46.225", // API endpoint 2
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
      headers: {
        Connection: "keep-alive"
      }
    })
  );
}