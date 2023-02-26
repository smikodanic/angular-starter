/**
 * Middleware for error manipulation.
 */
// const { log_errors_api_model } = require('../models');


class ErrorApi {

  constructor() {
    this.errDoc = null;
  }


  /**
   * Create error doc with all needed properties.
   * @param {Error} err
   * @param {Request} req
   */
  create_errorDoc(err, req) {
    let user_id = null, endpoint = '', client_ip = '';

    if (!!req) {
      user_id = req.user ? req.user._id : null;

      const host = req.get('host');
      endpoint = `${req.method} ${req.protocol}://${host}${req.originalUrl}`; // POST http://localhost:3000/api/developer/tasks/add

      client_ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
    }

    this.errDoc = {
      user_id, // logged user
      status: err.status || 400, // status number 500, 404
      endpoint, // DELETE http://localhost:3005/api/developer/tasks/5b0d5d56fd4ec96d619bf394
      client_ip, // 56.23.128.22
      message: err.message,
      stack: err.stack
    };
  }


  /**
   * Convert error to JSON and send formatted error to client.
   * @param  {Object} - errDoc
   * @return void
   */
  send2client(res, next) {
    if (!res) { return; }
    const status = !!this.errDoc && !!this.errDoc.status ? this.errDoc.status : 400;
    res.status(status).json(this.errDoc);
  }


  /**
   * Insert error to 'log_errors_api' collection
   * @param  {object} - errDoc
   * @return void
   */
  async send2mongo() {
    // await log_errors_api_model.add(this.errDoc);
  }


  /**
   * Send to linux console (only in development environment)
   */
  send2console() {
    console.log(JSON.stringify(this.errDoc, null, 4).cliBoja('red'));
  }


  /**
   * Report error 404 on bad /api/... URLs
   * @param {Request} req
   * @param {Response} res
   */
  onBadURL(req, res, next) {
    const err = new Error(`Error 404 (Not Found): ${req.url} `);
    err.status = 404;
    err.stack = ''; // not very useful info so it is deleted
    next(err); // send to onEndpointError(err, req, res) middleware
  }


  /**
   * Send error to mongo, HTTP client (browser) or linux console.
   * @param {Error} err
   * @param {Request} req
   * @param {Response} res
   */
  onEndpointError(err, req, res, next) {
    this.create_errorDoc(err, req);
    this.send2mongo();
    this.send2console(err);
    this.send2client(res, next);
  }


  /**
   * Catch all uncaught exceptions.
   * Example:
   * const fse = require('fs-extra');
    fse.readFile('somefile.txt', function (err, data) {
      if (err) throw err;
      console.log(data);
    });
   */
  onUncaught() {
    process.on('uncaughtException', (err) => {
      err.message = 'UNCAUGHT error:: ' + err.message || '';
      const req = !!global.api ? global.api.req : null;
      const res = !!global.api ? global.api.res : null;
      this.create_errorDoc(err, req);
      this.send2mongo();
      this.send2console(err);
      this.send2client(res);
    });
  }


  /**
   * Unhandeled promise error.
   */
  onUnhandled() {
    process.on('unhandledRejection', (err, promise) => {
      err.message = 'UNHANDLED error:: ' + err.message || '';
      const req = !!global.api ? global.api.req : null;
      const res = !!global.api ? global.api.res : null;
      this.create_errorDoc(err, req);
      this.send2mongo();
      this.send2console(err);
    });
  }


}




module.exports = new ErrorApi();
