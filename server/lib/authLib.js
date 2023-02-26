const crypto = require('crypto');
const env = require('../lib/envFetch.js');


/**
 * Convert password to hash
 * @param  {string} password
 */
module.exports.pwdEncrypt = (password) => {
  // const salt = crypto.randomBytes(16).toString('hex');
  const salt = env.pwd_salt;
  const password_encrypted = crypto.pbkdf2Sync(password, salt, 1000, 32, `sha512`).toString(`hex`);
  return password_encrypted;
};
