const passport = require('passport');



class AuthHand {

  /**
   * PassportJS check authentication middleware
   * @param {string} label - passportjs label like 'jwt-users', 'hash-appsAPI'
   */
  authCheck(label) {
    return passport.authenticate(label, {
      successRedirect: '',
      // failureRedirect: '/examples/auth/passport/badauth',
      failureRedirect: '',
      failWithError: true, // send error as JSON instead of 'unauthorized' string
      failureFlash: false,
      session: false // this must be false
    });
  }


  /**
   * Middleware which allow access for only specific user's role (admin or operator or cashier)
   * @param  roles {Array}     - ['admin', 'developer', 'customer', 'robot']
   * @return {Function}         - middleware function
   */
  mustHaveRoles(roles) {
    return (req, res, next) => {
      // console.log(req.user.role, userRole);
      if (roles.indexOf(req.user.role) !== -1) {
        next();
      } else {
        next(new Error('Role ' + req.user.role + ' doesn\'t have permission for this endpoint.'));
      }
    };
  }




}


module.exports = new AuthHand();
