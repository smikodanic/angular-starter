const express = require('express');
const router = express.Router();


/*** general ***/
const infoR = require('./info.js');
router.get('/', infoR);


module.exports = router;
