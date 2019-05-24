const express = require('express');
const router = express.Router();

router.use(require('./auth'));
router.use(require('./accounts'));
router.use(require('./orders'));
router.use(require('./orderitems'));

module.exports = router;
