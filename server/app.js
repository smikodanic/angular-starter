const morgan = require('morgan');
const passport = require('passport');
const express = require('express');
const app = express();

const env = require('./lib/envFetch.js');
const logErrorApi = require('./middlewares/logErrorApi');
const cors = require('./middlewares/cors');
const mongooseDriver = require('./middlewares/mongodb/mongooseDriver');
const { defineStrategy4users } = require('./middlewares/auth/passportstrategy_jwt.js');



/***** MIDDLEWARES *****/
app.use(morgan('dev')); // must be first to log each request
app.use(express.json({ limit: '50mb' })); // parse body in POST requests -> req.body
app.use(express.urlencoded({ extended: true })); // when submitting form with content-type="application/x-www-form-urlencoded"
app.use(cors);

// mongoose
mongooseDriver.connectDefault(env.mongodb);

// auth middlewares
app.use(passport.initialize()); // initialize passport module
defineStrategy4users();


/***** GLOBAL  ****/
app.use((req, res, next) => { global.api.req = req; global.api.res = res; next(); }); // save req & res to global variable


/***** API ROUTES *****/
app.use('/', require('./routes/root.js'));
app.use('/panel', require('./routes/panel'));


/******************** ERROR HANDLERS *******************/
const onBadURL = logErrorApi.onBadURL.bind(logErrorApi);
const onEndpointError = logErrorApi.onEndpointError.bind(logErrorApi);
const onUncaught = logErrorApi.onUncaught.bind(logErrorApi);
const onUnhandled = logErrorApi.onUnhandled.bind(logErrorApi);
app.use(onBadURL); // 404 not found middleware
app.use(onEndpointError); // send error to client, mongo or console
onUncaught(); // uncaught exceptions
onUnhandled(); // onUnhandled exception



module.exports = app;
