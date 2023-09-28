const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const swaggerRouter = express.Router();


const options = {
    requestInterceptor: function(request){
        request.headers.Origin = `http://localhost:3000`;
        return request;
    },

    url: `http://localhost:3000/docs/api-docs`,
    explorer: true,
    customJsStr: 'console.log("Hello World")',
};

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = swaggerRouter;