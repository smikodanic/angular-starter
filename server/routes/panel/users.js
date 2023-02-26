/**
 * /users/...
 */
const jwt = require('jsonwebtoken');
const env = require('../../lib/envFetch.js');
const { users_model } = require('../../models');
const authLib = require('../../lib/authLib');


/**
 * POST /panel/users/register
 * Register an user.
{
  "first_name": "Marko",
  "last_name": "Marković",
  "address": "Radića 23",
  "city": "Osijek",
  "country": "Croatia",

  "phone": "+385-93-2111-222",
  "email": "test@uniapi.com",
  "website": "www.uniapi.org",

  "username": "marko",
  "password": "12345",

  "role": "customer"
}
 */
module.exports.register = (req, res, next) => {
  const user = req.body;

  users_model.add(user)
    .then(userDoc => {
      userDoc.password = undefined;
      res.json({
        success: true,
        count: 1,
        message: 'User is created.',
        data: userDoc
      });
    })
    .catch(next);
};


/**
 * POST /panel/users/login
{
  "username": "marko",
  "password": "12345"
}
 * After successful login with username:password a JWT token is sent as response.
 */
module.exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userDoc = await users_model.getOne({ username });
    if (!userDoc) { throw new Error('Username does not exists.'); }

    const passEncrypted = authLib.pwdEncrypt(password);
    if (passEncrypted !== userDoc.password) { throw new Error('Password is not correct.'); }

    if (!userDoc.is_active) { throw new Error('The account is not active. Contact the administrator.'); }

    // on successful login
    const jwt_payload = { id: userDoc._id, username: userDoc.username };
    const jwtToken = jwt.sign(jwt_payload, env.jwt_secret);
    userDoc.password = undefined;

    const jdata = {
      success: true,
      message: 'Login was successful. JWT is generated and you can use it in the API request header -> Authorization: JWT ...',
      jwtToken: 'JWT ' + jwtToken, // set cookie 'auth__jwtToken': protect each API request with JWT token
      loggedUser: userDoc // set cookie 'auth_loggedUser': logged user info
    };
    res.json(jdata);

  } catch (err) {
    next(err);
  }


};



/**
 * GET /panel/users/loggedinfo
 * Get logged user data (without password).
 * HTTP header -> Authorization: JWT ...
 */
module.exports.loggedinfo = (req, res, next) => {
  const username = req.user.username; // comes from /server/app/middlewares/auth/passportstrategy_jwt.js
  const moQuery = { username };

  users_model.getOne(moQuery)
    .then(userDoc => {
      const userObj = userDoc.toObject();
      userObj.fullname = `${userObj.first_name} ${userObj.last_name}`;
      delete userObj.password;
      res.json(userObj);
    })
    .catch(next);
};



/**
 * [admin] POST /panel/admin/test
 * Test admin endpoint.
 * HTTP header -> Authorization: JWT ...
 */
module.exports.adminTest = function (req, res, next) {
  res.json({
    success: true,
    message: 'Admin endpoint works!'
  });
};



/**
 * [customer] POST /panel/customer/test
 * Test customer endpoint.
 * HTTP header -> Authorization: JWT ...
 */
module.exports.customerTest = function (req, res, next) {
  res.json({
    success: true,
    message: 'Customer endpoint works!'
  });
};
