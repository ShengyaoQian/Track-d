"use strict;"

const loginUrl = '/login';
const loginCallbackUrl = '/';

var http = require('http');                     //http server
var https = require('https');                   //https server
var fs = require('fs');                         //file system
var express = require("express");               //express middleware
var morgan = require('morgan');                 //logger for express
var bodyParser = require('body-parser');        //body parsing middleware
var cookieParser = require('cookie-parser');    //cookie parsing middleware
var session = require('express-session');       //express session management
var passport = require('passport');             //authentication middleware
var uwshib = require('passport-uwshib');        //UW Shibboleth auth strategy

///////////////////////////////////////////////////////////////////////////////
// load files and read environment variables
//

//get server's domain name from environment variable
//this is necessary as the passport-saml library requires
//this when we create the Strategy
var domain = process.env.DOMAIN;
if (!domain || domain.length == 0)
    throw new Error('You must specify the domain name of this server via the DOMAIN environment variable!');

var httpPort = process.env.HTTPPORT || 8081;

// var httpPort = 8081;

//load public certificate and private key
//used for HTTPS and for signing SAML requests
//put these in a /security subdirectory with the following names,
//or edit the paths used in the following lines
var publicCert = fs.readFileSync('./app/server-cert.pem', 'utf-8');
var privateKey = fs.readFileSync('./app/server-pvk.pem', 'utf-8');

///////////////////////////////////////////////////////////////////////////////
// setup express application and register middleware
//
var app = express();
app.use(morgan({
    format: process.env.LOGFORMAT || 'dev'
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(cookieParser());
app.use(session({
    secret: fs.readFileSync('./app/session-secret.txt', 'utf-8'),
    cookie: {secret: true}
}));
app.use(passport.initialize());
app.use(passport.session());

//create the UW Shibboleth Strategy and tell Passport to use it
var strategy = new uwshib.Strategy({
    entityId: domain,
    privateKey: privateKey,
    callbackUrl: loginCallbackUrl,
    domain: domain
});

passport.use(strategy);

//These functions are called to serialize the user
//to session state and reconsitute the user on the 
//next request. Normally, you'd save only the netID
//and read the full user profile from your database
//during deserializeUser, but for this example, we
//will save the entire user just to keep it simple
passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

///////////////////////////////////////////////////////////////////////////////
// login, login callback, and metadata routes
//
app.get(loginUrl, passport.authenticate(strategy.name), uwshib.backToUrl());
app.post(loginCallbackUrl, passport.authenticate(strategy.name), uwshib.backToUrl());
app.get(uwshib.urls.metadata, uwshib.metadataRoute(strategy, publicCert));

//secure all routes following this
//alternatively, you can use ensureAuth as middleware on specific routes
//example:
//  app.get('protected/resource', uwshib.ensureAuth(loginUrl), function(req, res) {
//      //route code
//  });
app.use(uwshib.ensureAuth(loginUrl));


///////////////////////////////////////////////////////////////////////////////
// application routes
//
//general error handler
//if any route throws, this will be called
app.use(function(err, req, res, next){
    console.error(err.stack || err.message);
    res.send(500, 'Server Error! ' + err.message);
});


var __dirname = '/var/app/current/Tracked_Web_Client';
var path = '';

app.use(express.static(__dirname + path));

app.get('/events_today', require('./controllers.js').events_today);
app.get('/events', require('./controllers.js').events);
app.get('/organizations', require('./controllers.js').organizations);

app.use(bodyParser.json()); 
app.post('/post_event', require('./controllers.js').post_event);

///////////////////////////////////////////////////////////////////////////////
// web server creation and startup
//


app.listen(httpPort, function() {
    console.log('Listening for HTTP requests on port %d, but will auto-redirect to HTTPS');
});


