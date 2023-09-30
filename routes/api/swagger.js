const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const swaggerRouter = express.Router();

const { BASE_URL, FRONT_DEV} = process.env;


const options = {
    // requestInterceptor: function(request){
    //     request.headers.Origin = FRONT_DEV || BASE_URL;
    //     return request;
    // },

    url: BASE_URL,
    explorer: true,
    validatorUrl: null,
    CSS_URL: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"
};

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = swaggerRouter;