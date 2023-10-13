const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1/symbols",
    createProxyMiddleware({
      target: "https://api.bitfinex.com",
      changeOrigin: true,
      pathRewrite: {
        "^/v1/symbols": "/v1/symbols", // This rewrites the URL path to remove the '/v1/symbols' prefix.
      },
    })
  );
};
