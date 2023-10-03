const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const { SwaggerUIBundle } = require('swagger-ui-dist');

const swaggerRouter = express.Router();

const { BASE_URL, FRONT_DEV} = process.env;

const options = {
    requestInterceptor: function(request){
        request.headers.Origin = FRONT_DEV || BASE_URL;
        return request;
    },

    url: BASE_URL,
    explorer: false,
    customJsStr: 'console.log("Hello World")',
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.9.0/swagger-ui.css',
    customfavIcon: 'https://static1.smartbear.co/swagger/media/assets/swagger_fav.png',

    apis: ["src/**/*.js"]
};

// swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument, options))


module.exports = swaggerRouter;