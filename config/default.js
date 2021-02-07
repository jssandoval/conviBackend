require("dotenv").config();

module.exports = {
  general: {
    port: process.env.PORT,
    sport: process.env.SPORT,
    jwtSecret: process.env.JWT_SECRET,
    SessionTime: process.env.SESSION_TIME, //60 * 60 * 2,
  },
  //Base de Datos
  mongo: {
    uri: process.env.URI_MONGO + ":" + process.env.PORT_MONGO + "/" + process.env.DB_MONGO,
    port: process.env.PORT_MONGO,
    isDebug: process.env.ISDEBUG_MONGO,
  },
  //file upload directory
  filedirector: process.env.UPLOADDIR,
  //emails
  email: {
    provider: 'gmail.google.com',
    username: 'jssandoval@gmail.com',
    password: 'XXXXXYYYYXXXX'
  },
  logger:'dev'
};