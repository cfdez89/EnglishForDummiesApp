'use strict';
/* 
 * Carlos Fernandez Jimenez
 * Command to start 
 * set DEBUG=* & npm start
 */

// import libs
const express        = require('express');
const debug          = require('debug')('app');
const path           = require('path');
const compression    = require('compression');
const methodOverride = require('method-override');
const bodyParser     = require('body-parser');
const passport       = require('passport');
const cookieParser   = require('cookie-parser');
const session        = require('express-session');
const errorHandler   = require('errorhandler');
const config         = require('config');

// import modules 
const accountRoutes  = require('./src/account/accountApi');

const app = express();

// App constants 
var APP_SERVER_PORT  = config.get('serverPort');

// Set configuration 
app.set('port', process.env.PORT || APP_SERVER_PORT);
app.use(compression());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(__dirname));

// Error handling, running in development environment
if ('development' === app.get('env')) {
	app.use(errorHandler({
		dumpExceptions: true, 
		showStack: true
	}));
}

// Error handling, running in production environment 
if ('production' === app.get('env')) {
	app.use(errorHandler());
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// End points
accountRoutes.init(app);

app.all('*', (req, res) => {
    res.sendFile(__dirname + '/public/notFound.html');
})

app.listen(app.get('port'), () => {
    debug(`Listening on port ${app.get('port')}`);
});
  