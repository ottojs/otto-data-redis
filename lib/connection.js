
'use strict';

// Modules
var redis = require('redis');

// Options
var options = {};
var host, port, auth;

// RedisToGo
if (process.env.REDISTOGO_URL) {

  var redistogo_regex = /^redis:\/\/redistogo:(.+)@(.+):([0-9]+)\/$/;
  var result = redistogo_regex.exec(process.env.REDISTOGO_URL);

  host = result[2];
  port = result[3];
  auth = result[1];

// Other
} else {

  host = process.env.OTTO_REDIS_HOST || '127.0.0.1';
  port = process.env.OTTO_REDIS_PORT || 6379;
  auth = process.env.OTTO_REDIS_AUTH || null;

}

if (auth) {
  options.auth_pass = auth;
}

// Exports
module.exports = redis.createClient(port, host, options);
