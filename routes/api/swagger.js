const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const serveStatic = require('serve-static');
const swaggerUIPath = require('swagger-ui-dist').getAbsoluteFSPath();

const swaggerRouter = express.Router();

const { BASE_URL, FRONT_DEV} = process.env;

// const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
// const swaggerUI = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.js";
// const bundle = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-bundle.js";
// const bundleMap = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-bundle.js.map";
// const bundleMin = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-bundle.min.js";
// const bundleCore = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-es-bundle-core.js";
// const bundleCoreMap = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-es-bundle-core.js.map";
// const bundleCoreMin = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui-es-bundle-core.min.js";
// const cssMin = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.min.css";

const options = {
    requestInterceptor: function(request){
        request.headers.Origin = FRONT_DEV || BASE_URL;
        return request;
    },

    url: BASE_URL,
    explorer: true,
    customJsStr: 'console.log("Hello World")',

    apis: ["src/**/*.js"]
};


swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// swaggerRouter.get('/', swaggerUi.setup(swaggerDocument, options));

// swaggerRouter.use('/', swaggerUi.serve);
// swaggerRouter.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = swaggerRouter;