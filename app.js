//variabes de entorno
const dotenv = require("dotenv");
//requerimientos e imports
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { error404Handler, errorHandler } = require('./middleware');

//requerimientos propios
const { dbConnection } = require('./config/database');
const { swConfig } = require('./config/swagger');
const routes = require('./routes/index');
const config = require("config");

//settings
dotenv.config();

// Creando servidor de express
const app = express();

//configurar CORS
app.use(cors());

//Lectura y Parseo del body
app.use( express.json());
app.use(express.urlencoded({ extended: false }));

//log
app.use(logger(config.get('logger')));

//Base de Datos
dbConnection();

//swagger
swConfig();

//directorio publico
// app.use(express.static('public'));

// app.set("port", config.general.port || 8080);
// app.set("sport", config.general.sport || 8443);

//Rutas
app.use('/', routes);

//captura de errores de http
app.use(error404Handler);
app.use(errorHandler);

module.exports = app;
