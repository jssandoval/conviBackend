/*  
    conexion a la base de datos Mongodb
*/
const mongoose = require('mongoose');
const config = require("config");

const dbConnection = async() => {
    //conexion a la base de datos
    try {
        await mongoose.connection.openUri(config.get('mongo.uri'), { 
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false, 
                useCreateIndex: true 
        });
        console.log('Base de datos:  \x1b[32m%s\x1b[0m', "online");
    } catch(error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB ver logs');
    }
};

module.exports = {
    dbConnection
}