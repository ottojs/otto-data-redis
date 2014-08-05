
'use strict';

// Modules
var redis = require('redis');

// Exports
module.exports = function () {

  // Redis Client
  return redis.createClient();

};
