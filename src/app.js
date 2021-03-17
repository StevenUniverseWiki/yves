const path = require('path');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const mongoose = require('./mongoose');

const http = require('https');
const { URL } = require('url');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio({
  cors: {
    origin: true
  }
}));

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Wikia /api/v1 proxy
app.use('/api-proxy', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');

  let options = new URL(`https://community.fandom.com/api/v1${req.url}`);
  let proxyRequest = http.get(options, (proxyResponse) => {
    proxyResponse.pipe(res, {end: true});
  });
  proxyRequest.on('error', console.error);

  req.pipe(proxyRequest, {end: true});
});

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
