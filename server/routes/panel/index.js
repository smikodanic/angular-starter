const express = require('express');
const router = express.Router();

const authHand = require('../_handlers/authHand');
const authCheckUsers = authHand.authCheck('jwt-users');
const mustHaveRoles = authHand.mustHaveRoles;



/*** U S E R S ***/
const userR = require('./users.js');

router.post('/users/register', userR.register);
router.post('/users/login', userR.login);
router.get('/users/loggedinfo', authCheckUsers, userR.loggedinfo);

// admin
router.get('/admin/test', authCheckUsers, mustHaveRoles(['admin']), userR.adminTest);

// customer
router.get('/customer/test', authCheckUsers, mustHaveRoles(['customer']), userR.customerTest);



module.exports = router;
