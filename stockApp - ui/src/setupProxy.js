const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/stock_api",
        createProxyMiddleware({
            target: 'http://localhost:3000',
            changeOrigin: true,
            pathRewrite:{
                "^/stock_api":""
            }
        })

    );

    app.use(
        "/user_api",
        createProxyMiddleware({
            target: "http://localhost:3075",
            changeOrigin: true,
            pathRewrite:{
                "^/user_api":""
            }
        })
    );

};

