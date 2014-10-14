
'use strict';

// Modules
var redis = require('redis');

// Configuration
var host    = process.env.OTTO_REDIS_HOST || '127.0.0.1';
var port    = process.env.OTTO_REDIS_PORT || 6379;
var auth    = process.env.OTTO_REDIS_AUTH || null;
var options = {};

if (auth) {
  options.auth_pass = auth;
}

// Exports
module.exports = redis.createClient(port, host, options);
