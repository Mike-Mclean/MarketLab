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
            target: "http://localhost:3050",
            changeOrigin: true,
            pathRewrite:{
                "^/user_api":""
            }
        })
    );

    app.use(
        "/funds_api",
        createProxyMiddleware({
            target: "http://localhost:3075",
            changeOrigin: true,
            pathRewrite:{
                "^/funds_api":""
            }
        })
    );

    app.use(
        "/orders_api",
        createProxyMiddleware({
            target: "http://localhost:3025",
            changeOrigin: true,
            pathRewrite:{
                "^/orders_api":""
            }
        })
    );
};

