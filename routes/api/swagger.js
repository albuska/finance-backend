const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const swaggerRouter = express.Router();

const { BASE_URL, FRONT_DEV} = process.env;

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css";

const opts = {
    requestInterceptor: function(request){
        request.headers.Origin = FRONT_DEV || BASE_URL;
        return request;
    },
    dom_id: '#myDomId',
    url: BASE_URL,
    explorer: false,
    customJsStr: 'console.log("Hello World")',
    customCssUrl: CSS_URL,

    apis: ["src/**/*.js"]
};


swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUi.generateHTML(opts)));


module.exports = swaggerRouter;