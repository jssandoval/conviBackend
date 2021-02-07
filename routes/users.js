/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middleware/validate-fields');
const controller = require('../controllers/users/controller');
const { 
        validateJWT 
        // varlidarADMIN_ROLE,
        // varlidarADMIN_ROLE_o_MismoUsuario
 } = require('../middleware/validate-jwt');

 // registro
router.post('/', 
    [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        validateFields,
    ], 
    controller.createUser);
//listado
router.get( '/', validateJWT, controller.getUsers);
//uno solo
router.get( '/:uid', validateJWT, controller.getUser);
//modificar
router.put( '/:uid',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        validateFields,
    ],
    controller.updateUser
);
//borrar
router.delete( '/:uid', validateJWT, controller.deleteUser );

module.exports = router;