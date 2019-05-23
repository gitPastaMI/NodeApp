const express = require('express');
const router = express.Router();

router.use(require('./auth'));
router.use(require('./orders'));
router.use(require('./accounts'));

module.exports = router;
