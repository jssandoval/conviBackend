var express = require('express');
var app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swConfig = async() => {
    //swagger documentacion
    // swagger definition
    const swaggerDefinition = {
        swagger : "2.0",
        info: {
            title: 'Backend API',
            version: '1.0.0',
            description: 'Documentación de las API\'s del Backend',
            termsOfService : "http://swagger.io/terms/",
            contact : {
            name: "Jaime Sandoval",
            email : "jssandoval@gmail.com",
            url: "https://www.software502.com"
            },
            license : {
            name : "Apache 2.0",
            url : "http://www.apache.org/licenses/LICENSE-2.0.html"
            }
        },
        schemes : [ "https", "http" ],
        host: 'localhost:3000',
        basePath: '/',
    };

    // options for the swagger docs
    const options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./routes/*.js'],
    };

    // initialize swagger-jsdoc
    const swaggerSpec = swaggerJSDoc(options);

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get('/swagger.json', function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

module.exports = {
    swConfig
}