const express = require('express');
const router = express.Router();

router.use(require('./auth'));
router.use(require('./accounts'));
router.use(require('./orders'));
router.use(require('./orderitems'));
router.use(require('./deliverygroups'));
router.use(require('./forecasts'));

module.exports = router;
