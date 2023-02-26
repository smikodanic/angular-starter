const env = require('./lib/envFetch.js');


/*** 1. Globals ***/
global.api = {
  req: null, // defined in Api/app.js for logErrorApi.js
  res: null, // defined in Api/app.js for logErrorApi.js
};


/*** 2. start HTTP Server i.e. API ***/
const Api = require('./Api');
const api = new Api(env);
api.start();
