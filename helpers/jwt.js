const jwt = require('jsonwebtoken');
const config = require('config');

const generateJWT = ( uid ) => {
    return new Promise( ( resolve, reject ) =>{
        const payload = {
            uid,
            //nombre,
            //rol
        };

        jwt.sign( payload, config.get('general.jwtSecret'), {
                expiresIn: '4h'
            }, (err, token) => {
                if ( err ) {
                    console.log(err);
                    reject('Could not generate the JWT');
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT
};