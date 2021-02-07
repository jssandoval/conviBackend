const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
// router.use('/api/hospitales', require('./hospital'));
// router.use('/api/busquedas', require('./busqueda'));
// router.use('/api/upload', require('./upload'));
router.use('/login', require('./auth'));
router.use('/', require('./app'));

module.exports = router;
