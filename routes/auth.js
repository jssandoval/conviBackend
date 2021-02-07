/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');

// const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { login, renewToken } = require('../controllers/auth/controller');
const { 
        validateJWT
        // varlidarADMIN_ROLE,
        // varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middleware/validate-jwt');
const { validateFields } = require('../middleware/validate-fields');

const router = Router();


router.post( '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validateFields
    ],
    login
);

// router.post( '/google',
//     [
//         check('token', 'El token de Google es obligatorio').not().isEmpty(),
//         validarCampos
//     ],
//     googleSignIn
// )

router.get( '/renew',
    validateJWT,
    renewToken
);

module.exports = router;
