const jwt = require('jsonwebtoken');
const config = require('config');

const validateJWT = (req, res, next) => {
    //leer el Token
    const token = req.header('x-token');

    // console.log(token);

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'There is no token in the request'
        });
    }

    try {
        const { uid } = jwt.verify( token, config.get('general.jwtSecret' ));

        req.uid = uid;
        // console.log(uid);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'The token is not valid'
        });
    }
};

module.exports = {
    validateJWT
};